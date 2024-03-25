export abstract class IEncrypter {
  abstract encrypt(data: unknown): Promise<string>
}

export abstract class IDecrypter {
  abstract decrypt<TData>(token: string): Promise<TData | null>
}
