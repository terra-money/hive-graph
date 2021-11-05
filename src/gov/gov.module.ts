import { Module } from '@nestjs/common'
import { GovResolver } from './gov.resolver'
import { GovService } from './gov.service'

@Module({
  providers: [GovService, GovResolver],
})
export class GovModule {}
