import { AppModule } from '#main/modules/app.module.js'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import passport from 'passport'
import { Strategy as SteamStrategy } from 'passport-steam'

const port = 3030

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
    })
  )

  passport.use(
    new SteamStrategy(
      {
        realm: `http://${process.env.APP_HOST}`,
        apiKey: process.env.STEAM_SECRET,
        returnURL:
          'http://' + `${process.env.APP_HOST}/auth/login/steam/redirect`,
      },
      (identifier, profile, done): void => {
        done(null, {
          steamId: profile.id,
          name: profile.displayName,
          img: profile._json.avatarfull,
        })
      }
    )
  )
  app.use(passport.initialize())

  await app.listen(port)

  process.stdout.write(`🚀 Server is running on ${await app.getUrl()}\n`)
}

bootstrap().catch(console.error)
