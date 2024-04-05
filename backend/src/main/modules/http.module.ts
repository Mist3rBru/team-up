import { AuthControllersModule } from '#main/modules/controllers/auth-controllers.module.js'
import { GameControllersModule } from '#main/modules/controllers/game-controllers.module.js'
import { PlatformControllersModule } from '#main/modules/controllers/platform-controllers.module.js'
import { TeamControllersModule } from '#main/modules/controllers/team-controllers.module.js'
import { UserControllersModule } from '#main/modules/controllers/user-controllers.module.js'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ServeStaticModule } from '@nestjs/serve-static'
import path from 'node:path'

@Module({
  imports: [
    MulterModule.register({
      dest: path.resolve('public/uploads'),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('public'),
      serveRoot: '/public',
    }),
    AuthControllersModule,
    UserControllersModule,
    PlatformControllersModule,
    GameControllersModule,
    TeamControllersModule,
  ],
})
export class HttpModule {}
