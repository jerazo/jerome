#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CONFIG_PATH="${ROOT_DIR}/src/config/atomic-structure.json"
COMPONENTS_DIR="${ROOT_DIR}/src/components"

if [[ ! -f "${CONFIG_PATH}" ]]; then
  echo "Missing atomic structure config at ${CONFIG_PATH}" >&2
  exit 1
fi

node --input-type=module - "${ROOT_DIR}" "${CONFIG_PATH}" "${COMPONENTS_DIR}" <<'EOF'
import fs from 'node:fs'
import path from 'node:path'

const [rootDir, configPath, componentsDir] = process.argv.slice(2)
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
const folderByCategory = config.categories

const moves = []

for (const folder of Object.values(folderByCategory)) {
  const folderPath = path.join(componentsDir, folder)
  if (!fs.existsSync(folderPath)) {
    continue
  }

  for (const entry of fs.readdirSync(folderPath, { withFileTypes: true })) {
    if (!entry.isFile() || !/\.tsx?$/.test(entry.name)) {
      continue
    }
    if (config.exemptions.files.includes(entry.name)) {
      continue
    }

    const componentName = entry.name.replace(/\.tsx?$/, '')
    const expectedCategory = config.components[componentName]
    if (!expectedCategory) {
      continue
    }

    const expectedFolder = folderByCategory[expectedCategory]
    if (expectedFolder === folder) {
      continue
    }

    moves.push({
      componentName,
      from: path.join(folderPath, entry.name),
      to: path.join(componentsDir, expectedFolder, entry.name),
    })
  }
}

let failed = false

for (const move of moves) {
  fs.mkdirSync(path.dirname(move.to), { recursive: true })
  if (fs.existsSync(move.to)) {
    console.error(`Cannot move ${move.componentName}: destination already exists (${move.to})`)
    failed = true
    continue
  }
  fs.renameSync(move.from, move.to)
  console.log(
    `Moved ${move.componentName}: ${path.relative(rootDir, move.from)} -> ${path.relative(rootDir, move.to)}`,
  )
}

if (failed) {
  process.exit(1)
}
EOF

cd "${ROOT_DIR}"
npm run lint:fix

echo "Atomic structure fix complete. Run npm run lint to verify."
