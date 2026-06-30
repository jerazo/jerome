import type { Rule } from 'eslint'
import {
  collectExportedComponentNames,
  fixImportSourceFolder,
  getCategoryFolder,
  getComponentFileInfo,
  isExemptImportPath,
  loadAtomicStructureConfig,
  parseAtomicImportSource,
  type AtomicCategory,
  type AtomicStructureConfig,
} from '../lib/utils.js'

interface RuleOptions {
  configPath?: string
}

function getExpectedCategory(
  config: AtomicStructureConfig,
  componentName: string,
): AtomicCategory | undefined {
  if (config.exemptions.components.includes(componentName)) {
    return undefined
  }
  return config.components[componentName]
}

function reportImportMismatch(
  context: Rule.RuleContext,
  node: Rule.Node,
  componentName: string,
  expectedCategory: AtomicCategory,
  actualFolder: string,
  config: AtomicStructureConfig,
) {
  const expectedFolder = getCategoryFolder(config, expectedCategory)
  context.report({
    node,
    messageId: 'importCategoryMismatch',
    data: {
      component: componentName,
      expectedFolder,
      actualFolder,
      expectedCategory,
    },
    fix(fixer) {
      if (node.type !== 'ImportDeclaration') {
        return null
      }
      const sourceNode = (node as Rule.Node & { source: { range?: [number, number]; value: string } }).source
      if (!sourceNode.range) {
        return null
      }
      const sourceCode = context.sourceCode
      const originalText = sourceCode.getText(sourceNode as never)
      const quote = originalText[0] === '"' ? '"' : "'"
      const fixedSource = fixImportSourceFolder(sourceNode.value, expectedFolder)
      return fixer.replaceTextRange(sourceNode.range, `${quote}${fixedSource}${quote}`)
    },
  })
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce atomic component folder placement and matching import paths based on atomic-structure.json',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          configPath: { type: 'string' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      importCategoryMismatch:
        '{{component}} is an {{expectedCategory}} and must be imported from "{{expectedFolder}}", not "{{actualFolder}}".',
      barrelCategoryMismatch:
        '{{component}} is a {{expectedCategory}} and cannot be imported from the atomic barrel (atoms only). Import from "@/components/{{expectedFolder}}/{{component}}" instead.',
      fileCategoryMismatch:
        '{{component}} is an {{expectedCategory}} but is defined in "{{actualFolder}}". Move it to "src/components/{{expectedFolder}}/".',
      fileNameMismatch:
        'Component file "{{fileName}}" must export a component named "{{fileName}}". Found exports: {{exports}}.',
    },
  },

  create(context) {
    const options = (context.options[0] ?? {}) as RuleOptions
    const config = loadAtomicStructureConfig(options.configPath)
    const filename = context.filename.replace(/\\/g, '/')
    const fileInfo = getComponentFileInfo(filename, config)

    return {
      ImportDeclaration(node) {
        const importNode = node as Rule.Node & {
          importKind?: string
          source: { value: string }
          specifiers: Array<{
            type: string
            imported?: { name: string }
            importKind?: string
          }>
        }

        if (importNode.importKind === 'type') {
          return
        }

        const importSource = importNode.source.value
        if (isExemptImportPath(importSource, config)) {
          for (const specifier of importNode.specifiers) {
            if (specifier.type !== 'ImportSpecifier' || specifier.importKind === 'type') {
              continue
            }
            const componentName = specifier.imported?.name
            if (!componentName) {
              continue
            }
            const expectedCategory = getExpectedCategory(config, componentName)
            if (!expectedCategory) {
              continue
            }
            if (expectedCategory !== 'atom') {
              context.report({
                node: specifier,
                messageId: 'barrelCategoryMismatch',
                data: {
                  component: componentName,
                  expectedCategory,
                  expectedFolder: getCategoryFolder(config, expectedCategory),
                },
              })
            }
          }
          return
        }

        const parsed = parseAtomicImportSource(importSource)
        if (!parsed || parsed.isAtomicBarrel) {
          return
        }

        for (const specifier of importNode.specifiers) {
          if (specifier.type !== 'ImportSpecifier' || specifier.importKind === 'type') {
            continue
          }

          const componentName = specifier.imported?.name
          if (!componentName) {
            continue
          }

          const expectedCategory = getExpectedCategory(config, componentName)
          if (!expectedCategory) {
            continue
          }

          const expectedFolder = getCategoryFolder(config, expectedCategory)
          if (parsed.folder !== expectedFolder) {
            reportImportMismatch(
              context,
              node,
              componentName,
              expectedCategory,
              parsed.folder,
              config,
            )
          }
        }
      },

      Program(node) {
        if (!fileInfo) {
          return
        }

        const programNode = node as Rule.Node & { body: Array<{ type: string; [key: string]: unknown }> }
        const exportedNames = collectExportedComponentNames(programNode.body)
        const mappedExports = exportedNames.filter((name) => Boolean(config.components[name]))

        if (mappedExports.length === 0) {
          return
        }

        const primaryExport =
          mappedExports.find((name) => name === fileInfo.basename) ?? mappedExports[0]

        if (primaryExport !== fileInfo.basename) {
          context.report({
            node,
            messageId: 'fileNameMismatch',
            data: {
              fileName: fileInfo.basename,
              exports: exportedNames.join(', ') || '(none)',
            },
          })
        }

        const expectedCategory = config.components[primaryExport]
        if (!expectedCategory) {
          return
        }

        const expectedFolder = getCategoryFolder(config, expectedCategory)
        if (fileInfo.folder !== expectedFolder) {
          context.report({
            node,
            messageId: 'fileCategoryMismatch',
            data: {
              component: primaryExport,
              expectedCategory,
              expectedFolder,
              actualFolder: fileInfo.folder,
            },
          })
        }
      },
    }
  },
}

export default rule
