import { Module } from '@nestjs/common'
import { StakingResolver } from './staking.resolver'
import { StakingService } from './staking.service'

@Module({
  providers: [StakingService, StakingResolver],
})
export class StakingModule {}
