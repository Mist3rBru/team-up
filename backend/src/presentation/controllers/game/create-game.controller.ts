import { ICreateGame } from '#domain/usecases/game/create-game.js'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  IsUrl,
} from 'class-validator'

class CreateGameBodyDto {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  platforms: string[]

  @IsUrl()
  img: string

  @IsNotEmpty()
  name: string
}

@Controller()
export class CreateGameController {
  constructor(private readonly createGameService: ICreateGame) {}

  @Post('/game')
  async handle(@Body() body: CreateGameBodyDto): Promise<{ message: string }> {
    await this.createGameService.create(body)

    return {
      message: 'Jogo cadastrado com sucesso',
    }
  }
}
