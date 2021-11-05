import { Module } from '@nestjs/common'
import { MarketResolver } from './market.resolver'
import { MarketService } from './market.service'

@Module({
  providers: [MarketService, MarketResolver],
})
export class MarketModule {}
