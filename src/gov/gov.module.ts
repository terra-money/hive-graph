import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { GovResolver } from './gov.resolver'
import { GovService } from './gov.service'

@Module({
  imports: [LcdModule],
  providers: [GovService, GovResolver],
})
export class GovModule {}
