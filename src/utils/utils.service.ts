import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Coin as TerraCoin, InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, Validator } from 'src/common/models'
import { ValidatorVotingPower } from './models'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UtilsService {
  private nativeLcdService?: LCDClient = undefined

  constructor(
    @InjectPinoLogger(UtilsService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
    private readonly config: ConfigService,
  ) {
    const native_lcd_url = this.config.get<string>('NATIVE_LCD_URL')
    const native_lcd_chain_id = this.config.get<string>('NATIVE_LCD_CHAIN_ID')
    if (native_lcd_url && native_lcd_chain_id) {
      this.nativeLcdService = new LCDClient({
        URL: native_lcd_url,
        chainID: native_lcd_chain_id,
      })
    }
  }

  public async calculateTax(coin: Coin): Promise<Coin> {
    const { denom, amount } = coin

    try {
      const tax = await this.lcdService.utils.calculateTax(new TerraCoin(denom, amount))

      return Coin.fromTerraCoin(tax)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the tax that would be applied for the Coin %s%s.', amount, denom)

      throw new LCDClientError(err)
    }
  }

  public async validatorsWithVotingPower(): Promise<ValidatorVotingPower[]> {
    try {
      const data = await this.lcdService.utils.validatorsWithVotingPower()
      const validators = Object.values(data) ?? []

      return validators.map((item) => ({
        validator: Validator.fromTerraValidator(item.validatorInfo),
        voting_power: item.votingPower,
        proposer_priority: item.proposerPriority,
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current validators and merges their voting power.')

      throw new LCDClientError(err)
    }
  }

  public getLcdNativeService(): LCDClient {
    return this.nativeLcdService ? this.nativeLcdService : this.lcdService
  }
}
