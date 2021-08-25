import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { SlashingResolver } from './slashing.resolver'
import { SlashingService } from './slashing.service'

@Module({
  imports: [LcdModule],
  providers: [SlashingService, SlashingResolver],
})
export class SlashingModule {}
