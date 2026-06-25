/// <reference types="vite/client" />

interface BuildInfo {
  name: string
  version: string
  commit: string
  builtAt: string
}

declare const __BUILD_INFO__: BuildInfo
