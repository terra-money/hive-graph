import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { MintResolver } from './mint.resolver'
import { MintService } from './mint.service'

@Module({
  imports: [LcdModule],
  providers: [MintService, MintResolver],
})
export class MintModule {}
