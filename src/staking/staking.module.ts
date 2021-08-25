import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { StakingResolver } from './staking.resolver'
import { StakingService } from './staking.service'

@Module({
  imports: [LcdModule],
  providers: [StakingService, StakingResolver],
})
export class StakingModule {}
