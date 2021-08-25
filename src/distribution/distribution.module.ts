import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { DistributionResolver } from './distribution.resolver'
import { DistributionService } from './distribution.service'

@Module({
  imports: [LcdModule],
  providers: [DistributionService, DistributionResolver],
})
export class DistributionModule {}
