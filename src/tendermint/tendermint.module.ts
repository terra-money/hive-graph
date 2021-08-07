import { Module } from '@nestjs/common'
import { TendermintResolver } from './tendermint.resolver'
import { TendermintService } from './tendermint.service'

@Module({
  providers: [TendermintService, TendermintResolver],
})
export class TendermintModule {}
