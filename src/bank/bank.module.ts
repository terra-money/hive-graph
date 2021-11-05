import { Module } from '@nestjs/common'
import { BankResolver } from './bank.resolver'
import { BankService } from './bank.service'

@Module({
  providers: [BankService, BankResolver],
})
export class BankModule {}
