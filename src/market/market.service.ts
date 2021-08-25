import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Coin as TerraCoin, MarketAPI } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, MarketParams } from 'src/common/models'
import { LcdService } from 'src/lcd/lcd.service'

@Injectable()
export class MarketService {
  constructor(
    @InjectPinoLogger(MarketService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  public async swapRate(offerCoin: Coin, askDenom: string, height?: number): Promise<Coin> {
    const { denom, amount } = offerCoin

    try {
      const coin = await this.lcdService.getLCDClient(height).market.swapRate(new TerraCoin(denom, amount), askDenom)

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
      let delta
      const marketApi = this.lcdService.getLCDClient(height).market

      if (marketApi instanceof MarketAPI) {
        delta = await marketApi.poolDelta()
      } else {
        delta = await marketApi.terraPoolDelta()
      }

      return delta.toString()
    } catch (err) {
      this.logger.error({ err }, 'current value of the pool delta.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<MarketParams> {
    try {
      const params = await this.lcdService.getLCDClient(height).market.parameters()

      return {
        pool_recovery_period: params.pool_recovery_period,
        base_pool: params.base_pool.toString(),
        min_stability_spread:
          'min_spread' in params ? params.min_spread.toString() : params.min_stability_spread.toString(),
      }
    } catch (err) {
      this.logger.error({ err }, 'he current Market module parameters.')

      throw new LCDClientError(err)
    }
  }
}
