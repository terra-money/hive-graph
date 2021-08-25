import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { TendermintResolver } from './tendermint.resolver'
import { TendermintService } from './tendermint.service'

@Module({
  imports: [LcdModule],
  providers: [TendermintService, TendermintResolver],
})
export class TendermintModule {}
