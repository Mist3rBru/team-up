import { ICreateTeam } from '#domain/usecases/team/create-team.js'
import { created } from '#presentation/utils/http-reponse.js'
import type { HttpResponse } from '#presentation/utils/http-reponse.js'
import { Body, Controller, Post } from '@nestjs/common'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

class CreateTeamBodyDto {
  @IsUUID()
  gameId: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  description: string

  @IsBoolean()
  isOpen: boolean

  @IsBoolean()
  isPublic: boolean

  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  members: string[]
}

@Controller()
export class CreateTeamController {
  constructor(private readonly createTeamService: ICreateTeam) {}

  @Post('/team')
  async handle(@Body() body: CreateTeamBodyDto): Promise<HttpResponse> {
    await this.createTeamService.create(body)

    return created('time criado com sucesso.')
  }
}
