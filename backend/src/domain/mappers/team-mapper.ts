import type { Team } from '#domain/entities/team-entity.js'
import { UserMapper } from '#domain/mappers/user-mapper.js'
import type { Team as PrismaTeam } from '@prisma/client'

export class TeamMapper {
  constructor(private readonly props: Team) {}

  public toPrisma(): PrismaTeam {
    return {
      id: this.props.id,
      gameId: this.props.gameId,
      name: this.props.name,
      isOpen: this.props.isOpen,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    }
  }

  public toHttp() {
    return {
      id: this.props.id,
      name: this.props.name,
      isOpen: this.props.isOpen,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,

      members: this.props.members?.map(member =>
        new UserMapper(member).toTeam()
      ),
    }
  }
}
