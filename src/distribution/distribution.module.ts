import { Module } from '@nestjs/common'
import { DistributionResolver } from './distribution.resolver'
import { DistributionService } from './distribution.service'

@Module({
  providers: [DistributionService, DistributionResolver],
})
export class DistributionModule {}
