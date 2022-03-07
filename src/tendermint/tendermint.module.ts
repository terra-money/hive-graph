import { Module } from '@nestjs/common'
import { TendermintResolver } from './tendermint.resolver'
import { TendermintService } from './tendermint.service'
import { UtilsModule } from 'src/utils/utils.module'

@Module({
  imports: [UtilsModule],
  providers: [TendermintService, TendermintResolver],
})
export class TendermintModule {}
