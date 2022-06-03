import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { MintingParams } from 'src/common/models'
import { InjectLCDClient, LCDClient } from 'src/lcd'

@Injectable()
export class MintService {
  constructor(
    @InjectPinoLogger(MintService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async inflation(height?: number): Promise<string> {
    try {
      const inflation = await this.lcdService.mint.inflation({ height })

      return inflation.toString()
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current minting inflation value.')

      throw new LCDClientError(err)
    }
  }

  public async annualProvisions(height?: number): Promise<string> {
    try {
      const provisions = await this.lcdService.mint.annualProvisions({ height })

      return provisions.toString()
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current minting annaul provisions value.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<MintingParams> {
    try {
      const params = await this.lcdService.mint.parameters({ height })

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

      throw new LCDClientError(err)
    }
  }
}
