import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Coin as TerraCoin, InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, MarketParams } from 'src/common/models'

@Injectable()
export class MarketService {
  constructor(
    @InjectPinoLogger(MarketService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async swapRate(offerCoin: Coin, askDenom: string, height?: number): Promise<Coin> {
    const { denom, amount } = offerCoin

    try {
      const coin = await this.lcdService.market.swapRate(new TerraCoin(denom, amount), askDenom, { height })

      return Coin.fromTerraCoin(coin)
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting market swap rate for %s to a requested denomination %s.',
        `${offerCoin.denom} ${offerCoin.amount}`,
        askDenom,
      )

      throw new LCDClientError(err)
    }
  }

  public async terraPoolDelta(height?: number): Promise<string> {
    try {
      const delta = await this.lcdService.market.poolDelta({ height })

      return delta.toString()
    } catch (err) {
      this.logger.error({ err }, 'current value of the pool delta.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<MarketParams> {
    try {
      const params = await this.lcdService.market.parameters({ height })

      return {
        pool_recovery_period: params.pool_recovery_period,
        base_pool: params.base_pool.toString(),
        min_stability_spread: params.min_stability_spread.toString(),
      }
    } catch (err) {
      this.logger.error({ err }, 'he current Market module parameters.')

      throw new LCDClientError(err)
    }
  }
}
