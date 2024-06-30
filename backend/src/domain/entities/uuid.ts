import { randomUUID } from 'node:crypto'

export class UUID {
  private readonly props: {
    value: string
  }

  static parse<T extends string | null>(id: T): T {
    if (!id) {
      return id
    }

    return id.replaceAll(/[^\w-]/g, '') as T
  }

  static generate(): string {
    const uuid = randomUUID()

    return UUID.parse(uuid)
  }

  constructor(id?: string) {
    this.props = {
      value: id ? UUID.parse(id) : UUID.generate(),
    }
  }

  get value(): string {
    return this.props.value
  }
}
