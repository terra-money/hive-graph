import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
  imports: [LcdModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
