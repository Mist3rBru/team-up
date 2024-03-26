import { ICreateTeam } from '#domain/usecases/team/create-team.js'
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
  async handle(@Body() body: CreateTeamBodyDto): Promise<{ message: string }> {
    await this.createTeamService.create(body)

    return {
      message: 'time criado com sucesso.',
    }
  }
}
