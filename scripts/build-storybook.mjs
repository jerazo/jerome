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

  const warningPattern = /(\(!\)|\[PLUGIN_TIMINGS\]|Warning:|warn -)/i
  if (warningPattern.test(output)) {
    console.error('\nStorybook build failed: warnings were reported during the build.')
    process.exit(1)
  }

  process.exit(0)
})
