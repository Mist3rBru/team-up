import type {
  IHashComparator,
  IHashGenerator,
} from '#services/protocols/data/hasher.js'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHashGenerator, IHashComparator {
  async generate(data: string): Promise<string> {
    const hashSalt = 12

    return bcrypt.hash(data, hashSalt)
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash)
  }
}
