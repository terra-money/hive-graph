import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { TxResolver } from './tx.resolver'
import { TxService } from './tx.service'

@Module({
  imports: [LcdModule],
  providers: [TxService, TxResolver],
})
export class TxModule {}
