import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectTerraLCDClient, TerraLCDClient } from 'nestjs-terra'
import {
  InjectTerraLCDClient as LegacyInjectTerraLCDClient,
  TerraLCDClient as LegacyTerraLCDClient,
} from 'nestjs-terra-legacy'

@Injectable()
export class LcdService {
  private readonly legacyMaxHeight: number

  constructor(
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
    @LegacyInjectTerraLCDClient()
    private readonly terraClientLegacy: LegacyTerraLCDClient,
    private readonly config: ConfigService,
  ) {
    this.legacyMaxHeight = parseInt(this.config.get<string>('LEGACY_LCD_MAX_HEIGHT', '0'), 10)

    if (this.legacyMaxHeight < 1) {
      throw new Error('Invalid LEGACY_LCD_MAX_HEIGHT variable.')
    }
  }

  public getLCDClient(block?: number): TerraLCDClient | LegacyTerraLCDClient {
    if (!block || block > this.legacyMaxHeight) {
      return this.terraClient
    }

    return this.terraClientLegacy
  }
}
