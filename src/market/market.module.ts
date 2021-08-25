import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { MarketResolver } from './market.resolver'
import { MarketService } from './market.service'

@Module({
  imports: [LcdModule],
  providers: [MarketService, MarketResolver],
})
export class MarketModule {}
