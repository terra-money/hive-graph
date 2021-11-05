import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, OracleWhitelist, OracleParams } from 'src/common/models'
import { AggregateExchangeRatePrevote, AggregateExchangeRateVote } from './models'

@Injectable()
export class OracleService {
  constructor(
    @InjectPinoLogger(OracleService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async exchangeRates(height?: number): Promise<Coin[]> {
    try {
      const rates = await this.lcdService.oracle.exchangeRates({ height })

      return Coin.fromTerraCoins(rates)
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the Oracle currently registered exchange rate for LUNA in all available denominations.',
      )

      throw new LCDClientError(err)
    }
  }

  public async exchangeRate(denom: string, height?: number): Promise<Coin | null> {
    try {
      const rate = await this.lcdService.oracle.exchangeRate(denom, { height })

      if (!rate) {
        return null
      }

      return Coin.fromTerraCoin(rate)
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the Oracle currently registered exchange rate for the specific denomination.',
      )

      throw new LCDClientError(err)
    }
  }

  public async activeDenoms(height?: number): Promise<string[]> {
    try {
      return this.lcdService.oracle.activeDenoms({ height })
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current list of active denominations.')

      throw new LCDClientError(err)
    }
  }

  public async feederAddress(validator: string, height?: number): Promise<string> {
    try {
      return this.lcdService.oracle.feederAddress(validator, { height })
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the registered feeder address associated with the validator %s.',
        validator,
      )

      throw new LCDClientError(err)
    }
  }

  public async misses(validator: string, height?: number): Promise<number> {
    try {
      return this.lcdService.oracle.misses(validator, { height })
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the number of missed oracle votes for the validator over the current slash window.',
      )

      throw new LCDClientError(err)
    }
  }

  public async aggregatePrevote(validator: string, height?: number): Promise<AggregateExchangeRatePrevote> {
    try {
      const aggregatePrevote = await this.lcdService.oracle.aggregatePrevote(validator, { height })

      return {
        hash: aggregatePrevote.hash,
        voter: aggregatePrevote.voter,
        submit_block: aggregatePrevote.submit_block,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the validator %s current submitted aggregate prevote.', validator)

      throw new LCDClientError(err)
    }
  }

  public async aggregateVote(validator: string, height?: number): Promise<AggregateExchangeRateVote> {
    try {
      const aggregateVote = await this.lcdService.oracle.aggregateVote(validator, { height })

      return {
        exchange_rate_tuples: aggregateVote.exchange_rate_tuples.map(({ denom, exchange_rate }) => ({
          denom,
          amount: exchange_rate.toString(),
        })),
        voter: aggregateVote.voter,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the validator %s current submitted aggregate vote.', validator)

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<OracleParams> {
    try {
      const params = await this.lcdService.oracle.parameters({ height })

      return {
        vote_period: params.vote_period,
        vote_threshold: params.vote_threshold.toString(),
        reward_band: params.reward_band.toString(),
        reward_distribution_window: params.vote_period,
        whitelist: params.whitelist.map<OracleWhitelist>((item) => ({
          name: item.name,
          tobin_tax: item.tobin_tax.toString(),
        })),
        slash_fraction: params.slash_fraction.toString(),
        slash_window: params.slash_window,
        min_valid_per_window: params.min_valid_per_window.toString(),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current Oracle parameters.')

      throw new LCDClientError(err)
    }
  }
}
