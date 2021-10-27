import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { OracleAPI } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, OracleWhitelist, OracleParams } from 'src/common/models'
import { LcdService } from 'src/lcd/lcd.service'
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
    private readonly lcdService: LcdService,
  ) {}

  public async votes(denom?: string, validator?: string, height?: number): Promise<ExchangeRateVote[]> {
    try {
      const oracleApi = this.lcdService.getLCDClient(height).oracle

      if (oracleApi instanceof OracleAPI) {
        throw new Error('The OracleAPI do not implement votes endpoint.')
      }

      const votes = await oracleApi.votes(denom, validator)

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

  public async prevotes(denom?: string, validator?: string, height?: number): Promise<ExchangeRatePrevote[]> {
    try {
      const oracleApi = this.lcdService.getLCDClient(height).oracle

      if (oracleApi instanceof OracleAPI) {
        throw new Error('The OracleAPI do not implement prevotes endpoint.')
      }

      const prevotes = await oracleApi.prevotes(denom, validator)

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

  public async exchangeRates(height?: number): Promise<Coin[]> {
    try {
      const rates = await this.lcdService.getLCDClient(height).oracle.exchangeRates({ height })

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
      const rate = await this.lcdService.getLCDClient(height).oracle.exchangeRate(denom)

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
      return this.lcdService.getLCDClient(height).oracle.activeDenoms({ height })
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current list of active denominations.')

      throw new LCDClientError(err)
    }
  }

  public async feederAddress(validator: string, height?: number): Promise<string> {
    try {
      return this.lcdService.getLCDClient(height).oracle.feederAddress(validator, { height })
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
      return this.lcdService.getLCDClient(height).oracle.misses(validator)
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
      const aggregatePrevote = await this.lcdService.getLCDClient(height).oracle.aggregatePrevote(validator)

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
      const aggregateVote = await this.lcdService.getLCDClient(height).oracle.aggregateVote(validator)

      return {
        exchange_rate_tuples: Coin.fromTerraCoins(aggregateVote.exchange_rate_tuples),
        voter: aggregateVote.voter,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the validator %s current submitted aggregate vote.', validator)

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<OracleParams> {
    try {
      const params = await this.lcdService.getLCDClient(height).oracle.parameters()

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
