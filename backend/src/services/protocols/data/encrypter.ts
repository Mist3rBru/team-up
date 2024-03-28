export abstract class IEncrypter {
  abstract encrypt(data: string): Promise<string>
}

export abstract class IDecrypter {
  abstract decrypt<TData>(token: string): Promise<TData | null>
}
