import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { ValAddress } from 'nestjs-terra'
import { Denom } from 'src/common/enums'
import { Coin } from 'src/common/models'
import {
  AggregateExchangeRatePrevote,
  AggregateExchangeRateVote,
  ExchangeRatePrevote,
  ExchangeRateVote,
  Oracle,
  OracleParams,
} from './models'
import { OracleService } from './oracle.service'

@Resolver(Oracle)
export class OracleResolver {
  constructor(private readonly oracleService: OracleService) {}

  @Query(() => Oracle)
  public async oracle(): Promise<Oracle> {
    return {} as Oracle
  }

  @ResolveField(() => [ExchangeRateVote])
  public async votes(
    @Args('denom', { nullable: true }) denom?: Denom,
    @Args('validator', { nullable: true }) validator?: ValAddress,
  ): Promise<ExchangeRateVote[]> {
    return this.oracleService.votes(denom, validator)
  }

  @ResolveField(() => [ExchangeRatePrevote])
  public async prevotes(
    @Args('denom', { nullable: true }) denom?: Denom,
    @Args('validator', { nullable: true }) validator?: ValAddress,
  ): Promise<ExchangeRatePrevote[]> {
    return this.oracleService.prevotes(denom, validator)
  }

  @ResolveField(() => [Coin])
  public async exchangeRates(): Promise<Coin[]> {
    return this.oracleService.exchangeRates()
  }

  @ResolveField(() => Coin, { nullable: true })
  public async exchangeRate(@Args('denom') denom: Denom): Promise<Coin | null> {
    return this.oracleService.exchangeRate(denom)
  }

  @ResolveField(() => [String])
  public async activeDenoms(): Promise<string[]> {
    return this.oracleService.activeDenoms()
  }

  @ResolveField(() => String)
  public async feederAddress(@Args('validator') validator: ValAddress): Promise<string> {
    return this.oracleService.feederAddress(validator)
  }

  @ResolveField(() => Int)
  public async misses(@Args('validator') validator: ValAddress): Promise<number> {
    return this.oracleService.misses(validator)
  }

  @ResolveField(() => AggregateExchangeRatePrevote)
  public async aggregatePrevote(@Args('validator') validator: ValAddress): Promise<AggregateExchangeRatePrevote> {
    return this.oracleService.aggregatePrevote(validator)
  }

  @ResolveField(() => AggregateExchangeRateVote)
  public async aggregateVote(@Args('validator') validator: ValAddress): Promise<AggregateExchangeRateVote> {
    return this.oracleService.aggregateVote(validator)
  }

  @ResolveField(() => OracleParams)
  public async parameters(): Promise<OracleParams> {
    return this.oracleService.parameters()
  }
}
