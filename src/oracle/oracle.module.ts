import { Module } from '@nestjs/common'
import { OracleResolver } from './oracle.resolver'
import { OracleService } from './oracle.service'

@Module({
  providers: [OracleService, OracleResolver],
})
export class OracleModule {}
