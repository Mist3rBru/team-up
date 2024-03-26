import { Team } from '#domain/entities/team-entity.js'
import { User } from '#domain/entities/user-entity.js'
import { UUID } from '#domain/entities/uuid.js'
import { HttpException, HttpStatus } from '@nestjs/common'

export class JoinTeamRequest {
  private readonly props: JoinTeamRequest.Props

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  private verifyStatus(status: string): JoinTeamRequest.Status {
    const validStatusList: JoinTeamRequest.Status[] = [
      'pending',
      'denied',
      'accepted',
      'canceled',
    ]

    if (!validStatusList.includes(status as JoinTeamRequest.Status)) {
      throw new HttpException(
        'invalid join team request status',
        HttpStatus.BAD_REQUEST
      )
    }

    return status as JoinTeamRequest.Status
  }

  constructor(params: JoinTeamRequest.Params) {
    this.props = {
      ...params,
      id: new UUID(params.id),
      status: params.status ? this.verifyStatus(params.status) : 'pending',
      createdAt: params.createdAt ?? new Date(),
      updatedAt: params.updatedAt ?? new Date(),

      team: params.team && new Team(params.team),
      user: params.user && new User(params.user),
    }
  }

  get id(): string {
    return this.props.id.value
  }

  get userId(): string {
    return this.props.userId
  }

  get teamId(): string {
    return this.props.teamId
  }

  get status(): string {
    return this.props.status
  }

  set status(status: string) {
    this.props.status = this.verifyStatus(status)
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get team(): Team | undefined {
    return this.props.team
  }

  get user(): User | undefined {
    return this.props.user
  }
}

export namespace JoinTeamRequest {
  export type Status = 'pending' | 'canceled' | 'accepted' | 'denied'

  export interface Props {
    id: UUID
    userId: string
    teamId: string
    status: Status
    createdAt: Date
    updatedAt: Date

    team?: Team
    user?: User
  }

  export interface Params {
    id?: string
    userId: string
    teamId: string
    status?: string
    createdAt?: Date
    updatedAt?: Date

    team?: Team.Params
    user?: User.Params
  }
}
