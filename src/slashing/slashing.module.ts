import { Module } from '@nestjs/common'
import { SlashingResolver } from './slashing.resolver'
import { SlashingService } from './slashing.service'

@Module({
  providers: [SlashingService, SlashingResolver],
})
export class SlashingModule {}
