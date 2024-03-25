import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module.js'

const port = 3030

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
    })
  )

  await app.listen(port)

  process.stdout.write(`🚀 Server is running on ${await app.getUrl()}\n`)
}

bootstrap().catch(console.error)
