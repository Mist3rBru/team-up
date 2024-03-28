declare global {
  namespace Express {
    interface User {
      steamId: string
      name: string
      img: string
    }
  }
}

export {}
