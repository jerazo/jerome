/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MIXPANEL_TOKEN?: string
  readonly VITE_CONTACT_API_URL?: string
  readonly VITE_CONTACT_ACCESS_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface BuildInfo {
  name: string
  version: string
  commit: string
  builtAt: string
}

declare const __BUILD_INFO__: BuildInfo
