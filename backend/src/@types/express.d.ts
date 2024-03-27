declare global {
  namespace Express {
    interface User {
      steamId?: string
      name?: string
    }
  }
}

export {}
