import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { OracleResolver } from './oracle.resolver'
import { OracleService } from './oracle.service'

@Module({
  imports: [LcdModule],
  providers: [OracleService, OracleResolver],
})
export class OracleModule {}
