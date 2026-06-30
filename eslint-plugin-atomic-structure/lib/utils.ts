import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export type AtomicCategory = 'atom' | 'molecule' | 'organism'

export interface AtomicStructureConfig {
  categories: Record<AtomicCategory, string>
  components: Record<string, AtomicCategory>
  exemptions: {
    importPaths: string[]
    files: string[]
    components: string[]
  }
}

const FOLDER_TO_CATEGORY: Record<string, AtomicCategory> = {
  atoms: 'atom',
  molecules: 'molecule',
  organisms: 'organism',
}

const DEFAULT_CONFIG_PATH = path.join(__dirname, '../src/config/atomic-structure.json')

let cachedConfig: AtomicStructureConfig | null = null
let cachedConfigPath: string | null = null

export function loadAtomicStructureConfig(configPath = DEFAULT_CONFIG_PATH): AtomicStructureConfig {
  const resolved = path.resolve(configPath)
  if (cachedConfig && cachedConfigPath === resolved) {
    return cachedConfig
  }

  const raw = fs.readFileSync(resolved, 'utf8')
  cachedConfig = JSON.parse(raw) as AtomicStructureConfig
  cachedConfigPath = resolved
  return cachedConfig
}

export function getCategoryFolder(config: AtomicStructureConfig, category: AtomicCategory): string {
  return config.categories[category]
}

export function parseAtomicImportSource(source: string): {
  folder: string
  componentFile: string
  isAtomicBarrel: boolean
} | null {
  const normalized = source.replace(/\.tsx?$/, '')

  if (normalized === '@/components/atomic' || normalized.endsWith('/components/atomic')) {
    return { folder: 'atomic', componentFile: '', isAtomicBarrel: true }
  }

  const patterns = [
    /(?:^@\/components\/(atoms|molecules|organisms)\/([^/]+))$/,
    /(?:^|\/)components\/(atoms|molecules|organisms)\/([^/]+)$/,
    /(?:^|\.\.\/)+(atoms|molecules|organisms)\/([^/]+)$/,
  ]

  for (const pattern of patterns) {
    const match = normalized.match(pattern)
    if (match) {
      return {
        folder: match[1],
        componentFile: match[2],
        isAtomicBarrel: false,
      }
    }
  }

  return null
}

export function fixImportSourceFolder(source: string, expectedFolder: string): string {
  return source.replace(/(^|.*\/)(atoms|molecules|organisms)(?=\/)/, `$1${expectedFolder}`)
}

export function isExemptImportPath(source: string, config: AtomicStructureConfig): boolean {
  const normalized = source.replace(/\.tsx?$/, '')
  return config.exemptions.importPaths.some((exemptPath) => {
    const normalizedExempt = exemptPath.replace(/\.tsx?$/, '')
    return normalized === normalizedExempt || normalized.endsWith(`/${normalizedExempt.replace(/^@\//, '')}`)
  })
}

export function getComponentFileInfo(
  filename: string,
  config: AtomicStructureConfig,
): { folder: string; basename: string; category: AtomicCategory | null } | null {
  const normalized = filename.replace(/\\/g, '/')
  const match = normalized.match(/\/components\/(atoms|molecules|organisms)\/([^/]+)\.tsx?$/)
  if (!match) {
    return null
  }

  const folder = match[1]
  const basename = match[2].replace(/\.tsx?$/, '')
  if (config.exemptions.files.includes(`${basename}.ts`) || config.exemptions.files.includes(`${basename}.tsx`)) {
    return null
  }

  const category = FOLDER_TO_CATEGORY[folder] ?? null
  return { folder, basename, category }
}

export function collectExportedComponentNames(programBody: Array<{ type: string; [key: string]: unknown }>): string[] {
  const names: string[] = []

  for (const node of programBody) {
    if (node.type === 'ExportNamedDeclaration') {
      const declaration = node.declaration as { type?: string; id?: { name?: string } } | null
      if (declaration?.type === 'FunctionDeclaration' && declaration.id?.name) {
        names.push(declaration.id.name)
      }
      if (declaration?.type === 'ClassDeclaration' && declaration.id?.name) {
        names.push(declaration.id.name)
      }
      if (declaration?.type === 'VariableDeclaration') {
        for (const declarator of (declaration as { declarations?: Array<{ id?: { name?: string } }> }).declarations ?? []) {
          if (declarator.id?.name) {
            names.push(declarator.id.name)
          }
        }
      }
    }

    if (node.type === 'ExportDefaultDeclaration') {
      const declaration = node.declaration as { type?: string; id?: { name?: string } } | null
      if (declaration?.type === 'FunctionDeclaration' && declaration.id?.name) {
        names.push(declaration.id.name)
      }
      if (declaration?.type === 'ClassDeclaration' && declaration.id?.name) {
        names.push(declaration.id.name)
      }
    }
  }

  return names
}

export { FOLDER_TO_CATEGORY }
