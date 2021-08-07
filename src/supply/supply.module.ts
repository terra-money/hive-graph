import { Module } from '@nestjs/common'
import { SupplyResolver } from './supply.resolver'
import { SupplyService } from './supply.service'

@Module({
  providers: [SupplyService, SupplyResolver],
})
export class SupplyModule {}
