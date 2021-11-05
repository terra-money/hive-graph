import { Module } from '@nestjs/common'
import { MsgauthResolver } from './msgauth.resolver'
import { MsgauthService } from './msgauth.service'

@Module({
  providers: [MsgauthService, MsgauthResolver],
})
export class MsgauthModule {}
