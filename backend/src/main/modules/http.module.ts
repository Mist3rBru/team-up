import { UserControllerModule } from '#main/modules/controllers/user-controller.module.js'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { resolve } from 'node:path'

@Module({
  imports: [
    MulterModule.register({ dest: resolve('public/uploads') }),
    UserControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class HttpModule {}
