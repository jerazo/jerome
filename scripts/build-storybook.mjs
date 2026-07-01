import { spawn } from 'node:child_process'

const child = spawn('storybook', ['build'], {
  shell: true,
  env: process.env,
})

let output = ''

child.stdout.on('data', (chunk) => {
  process.stdout.write(chunk)
  output += chunk
})

child.stderr.on('data', (chunk) => {
  process.stderr.write(chunk)
  output += chunk
})

child.on('close', (code) => {
  if (code !== 0) {
    process.exit(code ?? 1)
  }

  const outputWithoutPluginTimings = output
    .split('\n')
    .filter((line) => !/\[PLUGIN_TIMINGS\]/i.test(line))
    .join('\n')

  const warningPattern = /(\(!\)|Warning:|warn -)/i
  if (warningPattern.test(outputWithoutPluginTimings)) {
    console.error('\nStorybook build failed: warnings were reported during the build.')
    process.exit(1)
  }

  process.exit(0)
})
