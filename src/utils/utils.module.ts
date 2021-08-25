import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { UtilsResolver } from './utils.resolver'
import { UtilsService } from './utils.service'

@Module({
  imports: [LcdModule],
  providers: [UtilsService, UtilsResolver],
})
export class UtilsModule {}
