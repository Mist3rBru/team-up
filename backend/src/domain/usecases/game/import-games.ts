export abstract class IImportGames {
  abstract import(data: IImportGames.Params): Promise<void>
}

export namespace IImportGames {
  export interface Params {
    token: string
  }
}
