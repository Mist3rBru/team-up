declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      TOKEN_SECRET: string
    }
  }
}

export {}
