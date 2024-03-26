import type { Game } from '#domain/entities/game-entity.js'

export abstract class ICreateGame {
  abstract create(data: ICreateGame.Params): Promise<ICreateGame.Result>
}

export namespace ICreateGame {
  export type Params = OnlyRequired<Game.Params> & {
    platforms: string[]
  }

  export type Result = Game
}
