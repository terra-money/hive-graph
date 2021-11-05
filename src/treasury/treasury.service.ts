import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { Denom } from 'src/common/enums'
import { LCDClientError } from 'src/common/errors'
import { Coin, TreasuryParams } from 'src/common/models'

@Injectable()
export class TreasuryService {
  constructor(
    @InjectPinoLogger(TreasuryService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async taxCap(denom: Denom, height?: number): Promise<Coin> {
    try {
      const tax = await this.lcdService.treasury.taxCap(denom, { height })

      return Coin.fromTerraCoin(tax)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current registered Tax Cap for denomation %s.', denom)

      throw new LCDClientError(err)
    }
  }

  public async taxRate(height?: number): Promise<string> {
    try {
      const tax = await this.lcdService.treasury.taxRate(height, { height })

      return tax.toString()
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current registered Tax Rate.')

      throw new LCDClientError(err)
    }
  }

  public async rewardWeight(height?: number): Promise<string> {
    try {
      const reward = await this.lcdService.treasury.rewardWeight({ height })

      return reward.toString()
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current registered Reward Weight monetary policy lever.')

      throw new LCDClientError(err)
    }
  }

  public async taxProceeds(height?: number): Promise<Coin[]> {
    try {
      const proceeds = await this.lcdService.treasury.taxProceeds({ height })

      return Coin.fromTerraCoins(proceeds)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the tax proceeds for the epoch.')

      throw new LCDClientError(err)
    }
  }

  public async seigniorageProceeds(height?: number): Promise<Coin> {
    try {
      const proceeds = await this.lcdService.treasury.seigniorageProceeds({ height })

      return Coin.fromTerraCoin(proceeds)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the seigniorage proceeds for the epoch.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<TreasuryParams> {
    try {
      const params = await this.lcdService.treasury.parameters({ height })

      return {
        tax_policy: {
          rate_min: params.tax_policy.rate_min.toString(),
          rate_max: params.tax_policy.rate_max.toString(),
          cap: Coin.fromTerraCoin(params.tax_policy.cap),
          change_max: params.tax_policy.change_rate_max.toString(),
        },
        reward_policy: {
          rate_min: params.reward_policy.rate_min.toString(),
          rate_max: params.reward_policy.rate_max.toString(),
          cap: Coin.fromTerraCoin(params.reward_policy.cap),
          change_max: params.reward_policy.change_rate_max.toString(),
        },
        seigniorage_burden_target: params.seigniorage_burden_target.toString(),
        mining_increment: params.mining_increment.toString(),
        window_short: params.window_short,
        window_long: params.window_long,
        window_probation: params.window_probation,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current Treasury parameters.')

      throw new LCDClientError(err)
    }
  }
}
