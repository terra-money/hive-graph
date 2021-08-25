import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { BankResolver } from './bank.resolver'
import { BankService } from './bank.service'

@Module({
  imports: [LcdModule],
  providers: [BankService, BankResolver],
})
export class BankModule {}
