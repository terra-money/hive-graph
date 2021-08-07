import { Module } from '@nestjs/common'
import { MintResolver } from './mint.resolver'
import { MintService } from './mint.service'

@Module({
  providers: [MintService, MintResolver],
})
export class MintModule {}
