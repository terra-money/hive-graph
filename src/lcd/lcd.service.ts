import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TerraLCDClient } from 'nestjs-terra'
import { TerraLCDClient as LegacyTerraLCDClient } from 'nestjs-terra-legacy'
import { LCDClient } from 'nestjs-terra/node_modules/@terra-money/terra.js'

interface LCDConfig {
  chainID: string
  URL: string
}

@Injectable()
export class LcdService {
  private readonly legacyMaxHeight: number
  private lcd!: LCDClient
  private legacyLcd!: LCDClient

  constructor(private readonly config: ConfigService) {
    this.legacyMaxHeight = parseInt(this.config.get<string>('LEGACY_LCD_MAX_HEIGHT', '0'), 10)

    if (this.legacyMaxHeight < 1) {
      throw new Error('Invalid LEGACY_LCD_MAX_HEIGHT variable.')
    }

    this.lcd = new LCDClient({
      URL: this.config.get<string>('LCD_URL')!,
      chainID: this.config.get<string>('CHAIN_ID')!,
    })

    this.legacyLcd = new LCDClient({
      URL: this.config.get<string>('LEGACY_LCD_URL')!,
      chainID: this.config.get<string>('LEGACY_LCD_CHAIN_ID')!,
    })
  }

  public getLCDClient(block?: number): TerraLCDClient | LegacyTerraLCDClient {
    if (!block || block > this.legacyMaxHeight) {
      return this.lcd
    }

    return this.legacyLcd
  }

  public getLCDConfig(): LCDConfig {
    return {
      URL: this.config.get<string>('LCD_URL')!,
      chainID: this.config.get<string>('CHAIN_ID')!,
    }
  }
}
