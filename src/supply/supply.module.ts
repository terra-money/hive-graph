import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { SupplyResolver } from './supply.resolver'
import { SupplyService } from './supply.service'

@Module({
  imports: [LcdModule],
  providers: [SupplyService, SupplyResolver],
})
export class SupplyModule {}
