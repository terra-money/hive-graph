import { Module } from '@nestjs/common'
import { IbcResolver } from './ibc.resolver'
import { IbcService } from './ibc.service'

@Module({
  providers: [IbcResolver, IbcService],
})
export class IbcModule {}
