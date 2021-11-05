import { Module } from '@nestjs/common'
import { TreasuryResolver } from './treasury.resolver'
import { TreasuryService } from './treasury.service'

@Module({
  providers: [TreasuryService, TreasuryResolver],
})
export class TreasuryModule {}
