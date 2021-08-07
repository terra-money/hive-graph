import { Module } from '@nestjs/common'
import { TxResolver } from './tx.resolver'
import { TxService } from './tx.service'

@Module({
  providers: [TxService, TxResolver],
})
export class TxModule {}
