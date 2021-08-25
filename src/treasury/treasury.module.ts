import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { TreasuryResolver } from './treasury.resolver'
import { TreasuryService } from './treasury.service'

@Module({
  imports: [LcdModule],
  providers: [TreasuryService, TreasuryResolver],
})
export class TreasuryModule {}
