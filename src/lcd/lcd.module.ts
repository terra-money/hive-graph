import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TerraModule } from 'nestjs-terra'
import { TerraModule as TerraModuleLegacy } from 'nestjs-terra-legacy'
import { LcdService } from './lcd.service'

@Module({
  imports: [
    ConfigModule,
    TerraModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const URL = config.get<string>('LCD_URL')
        const chainID = config.get<string>('CHAIN_ID')

        if (!URL || !chainID) {
          throw new Error('Invalid LCD_URL or CHAIN_ID variables.')
        }

        return {
          URL,
          chainID,
        }
      },
    }),
    TerraModuleLegacy.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const URL = config.get<string>('LEGACY_LCD_URL')
        const chainID = config.get<string>('LEGACY_CHAIN_ID')

        if (!URL || !chainID) {
          throw new Error('Invalid LEGACY_LCD_URL or LEGACY_CHAIN_ID variables.')
        }

        return {
          URL,
          chainID,
        }
      },
    }),
  ],
  providers: [LcdService],
  exports: [LcdService],
})
export class LcdModule {}
