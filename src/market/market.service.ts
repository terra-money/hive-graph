import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Denom, InjectTerraLCDClient, TerraLCDClient, Coin as TerraCoin } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, MarketParams } from 'src/common/models'

@Injectable()
export class MarketService {
  constructor(
    @InjectPinoLogger(MarketService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async swapRate(offerCoin: Coin, askDenom: Denom): Promise<Coin> {
    const { denom, amount } = offerCoin

    try {
      const coin = await this.terraClient.market.swapRate(new TerraCoin(denom, amount), askDenom)

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

  public async terraPoolDelta(): Promise<string> {
    try {
      const delta = await this.terraClient.market.terraPoolDelta()

      return delta.toString()
    } catch (err) {
      this.logger.error({ err }, 'current value of the pool delta.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(): Promise<MarketParams> {
    try {
      const params = await this.terraClient.market.parameters()

      return {
        pool_recovery_period: params.pool_recovery_period,
        base_pool: params.base_pool.toString(),
        min_stability_spread: params.min_spread.toString(),
      }
    } catch (err) {
      this.logger.error({ err }, 'he current Market module parameters.')

      throw new LCDClientError(err)
    }
  }
}
