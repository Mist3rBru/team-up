import { Module } from '@nestjs/common'
import { HttpModule } from './http.module.js'

@Module({
  imports: [HttpModule],
})
export class AppModule {}
