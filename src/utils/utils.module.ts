import { Module } from '@nestjs/common'
import { UtilsResolver } from './utils.resolver'
import { UtilsService } from './utils.service'

@Module({
  providers: [UtilsService, UtilsResolver],
})
export class UtilsModule {}
