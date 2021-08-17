import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AccAddress, InjectTerraLCDClient, TerraLCDClient, ValAddress } from 'nestjs-terra'
import { Denom } from 'src/common/enums'
import { LCDClientError } from 'src/common/errors'
import { Coin, OracleWhitelist, OracleParams } from 'src/common/models'
import {
  AggregateExchangeRatePrevote,
  AggregateExchangeRateVote,
  ExchangeRatePrevote,
  ExchangeRateVote,
} from './models'

@Injectable()
export class OracleService {
  constructor(
    @InjectPinoLogger(OracleService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async votes(denom?: Denom, validator?: ValAddress): Promise<ExchangeRateVote[]> {
    try {
      const votes = await this.terraClient.oracle.votes(denom, validator)

      return votes.map<ExchangeRateVote>((vote) => ({
        exchange_rate: vote.exchange_rate.toString(),
        denom: vote.denom,
        voter: vote.voter,
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting the currently casted votes for the exchange rate of LUNA.')

      throw new LCDClientError(err)
    }
  }

  public async prevotes(denom?: Denom, validator?: ValAddress): Promise<ExchangeRatePrevote[]> {
    try {
      const prevotes = await this.terraClient.oracle.prevotes(denom, validator)
      console.log(prevotes)

      return prevotes.map<ExchangeRatePrevote>((prevote) => ({
        hash: prevote.hash,
        denom: prevote.denom,
        voter: prevote.voter,
        submit_block: !isNaN(prevote.submit_block) ? prevote.submit_block : 0,
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting the currently casted vprevotes.')

      throw new LCDClientError(err)
    }
  }

  public async exchangeRates(): Promise<Coin[]> {
    try {
      const rates = await this.terraClient.oracle.exchangeRates()

      return Coin.fromTerraCoins(rates)
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the Oracle currently registered exchange rate for LUNA in all available denominations.',
      )

      throw new LCDClientError(err)
    }
  }

  public async exchangeRate(denom: Denom): Promise<Coin | null> {
    try {
      const rate = await this.terraClient.oracle.exchangeRate(denom)

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

  public async activeDenoms(): Promise<string[]> {
    try {
      return this.terraClient.oracle.activeDenoms()
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current list of active denominations.')

      throw new LCDClientError(err)
    }
  }

  public async feederAddress(validator: ValAddress): Promise<AccAddress> {
    try {
      return this.terraClient.oracle.feederAddress(validator)
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the registered feeder address associated with the validator %s.',
        validator,
      )

      throw new LCDClientError(err)
    }
  }

  public async misses(validator: ValAddress): Promise<number> {
    try {
      return this.terraClient.oracle.misses(validator)
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the number of missed oracle votes for the validator over the current slash window.',
      )

      throw new LCDClientError(err)
    }
  }

  public async aggregatePrevote(validator: ValAddress): Promise<AggregateExchangeRatePrevote> {
    try {
      const aggregatePrevote = await this.terraClient.oracle.aggregatePrevote(validator)

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

  public async aggregateVote(validator: ValAddress): Promise<AggregateExchangeRateVote> {
    try {
      const aggregateVote = await this.terraClient.oracle.aggregateVote(validator)

      return {
        exchange_rate_tuples: Coin.fromTerraCoins(aggregateVote.exchange_rate_tuples),
        voter: aggregateVote.voter,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the validator %s current submitted aggregate vote.', validator)

      throw new LCDClientError(err)
    }
  }

  public async parameters(): Promise<OracleParams> {
    try {
      const params = await this.terraClient.oracle.parameters()

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
