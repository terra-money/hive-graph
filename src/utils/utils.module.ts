import { Module } from '@nestjs/common'
import { UtilsResolver } from './utils.resolver'
import { UtilsService } from './utils.service'
import { ConfigModule} from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  providers: [UtilsService, UtilsResolver],
  exports: [UtilsService]
})
export class UtilsModule {}
