declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      APP_HOST: string
      TOKEN_SECRET: string
      STEAM_SECRET: string
    }
  }
}

export {}
