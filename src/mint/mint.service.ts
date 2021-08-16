import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectTerraLCDClient, TerraLCDClient } from 'nestjs-terra'
import { MintingParams } from './models'

@Injectable()
export class MintService {
  constructor(
    @InjectPinoLogger(MintService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async inflation(): Promise<string> {
    try {
      const inflation = await this.terraClient.mint.inflation()

      return inflation.toString()
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current minting inflation value.')

      throw err
    }
  }

  public async annualProvisions(): Promise<string> {
    try {
      const provisions = await this.terraClient.mint.annualProvisions()

      return provisions.toString()
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current minting annaul provisions value.')

      throw err
    }
  }

  public async parameters(): Promise<MintingParams> {
    try {
      const params = await this.terraClient.mint.parameters()

      return {
        mint_denom: params.mint_denom,
        inflation_rate_change: params.inflation_rate_change.toString(),
        inflation_max: params.inflation_max.toString(),
        inflation_min: params.inflation_min.toString(),
        goal_bonded: params.goal_bonded.toString(),
        blocks_per_year: params.blocks_per_year,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current minting module parameters.')

      throw err
    }
  }
}
