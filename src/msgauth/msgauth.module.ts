import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { MsgauthResolver } from './msgauth.resolver'
import { MsgauthService } from './msgauth.service'

@Module({
  imports: [LcdModule],
  providers: [MsgauthService, MsgauthResolver],
})
export class MsgauthModule {}
