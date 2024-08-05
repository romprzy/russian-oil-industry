/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
