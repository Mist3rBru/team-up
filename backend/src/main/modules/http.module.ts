import { PrismaService } from '#infra/database/postgres/prisma.service.js'
import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { resolve } from 'node:path'

@Module({
  imports: [MulterModule.register({ dest: resolve('public/uploads') })],
  controllers: [],
  providers: [PrismaService],
})
export class HttpModule {}
