import atomicComponentPath from './rules/atomic-component-path.js'

const plugin = {
  meta: {
    name: 'eslint-plugin-atomic-structure',
    version: '1.0.0',
  },
  rules: {
    'atomic-component-path': atomicComponentPath,
  },
}

export default plugin
