import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { GetRequiredDenomArgs, GetRequiredValidatorArgs } from 'src/common/arguments/required.args'
import { Coin, OracleParams } from 'src/common/models'
import { AggregateExchangeRatePrevote, AggregateExchangeRateVote, Oracle } from './models'
import { OracleService } from './oracle.service'

@Resolver(Oracle)
export class OracleResolver {
  constructor(private readonly oracleService: OracleService) {}

  @Query(() => Oracle)
  public async oracle(): Promise<Oracle> {
    return {} as Oracle
  }

  @ResolveField(() => [Coin])
  public async exchangeRates(@Args() args: GetBaseArgs): Promise<Coin[]> {
    return this.oracleService.exchangeRates(args.height)
  }

  @ResolveField(() => Coin, { nullable: true })
  public async exchangeRate(@Args() args: GetRequiredDenomArgs): Promise<Coin | null> {
    return this.oracleService.exchangeRate(args.denom, args.height)
  }

  @ResolveField(() => [String])
  public async activeDenoms(@Args() args: GetBaseArgs): Promise<string[]> {
    return this.oracleService.activeDenoms(args.height)
  }

  @ResolveField(() => String)
  public async feederAddress(@Args() args: GetRequiredValidatorArgs): Promise<string> {
    return this.oracleService.feederAddress(args.validator, args.height)
  }

  @ResolveField(() => Int)
  public async misses(@Args() args: GetRequiredValidatorArgs): Promise<number> {
    return this.oracleService.misses(args.validator, args.height)
  }

  @ResolveField(() => AggregateExchangeRatePrevote)
  public async aggregatePrevote(@Args() args: GetRequiredValidatorArgs): Promise<AggregateExchangeRatePrevote> {
    return this.oracleService.aggregatePrevote(args.validator, args.height)
  }

  @ResolveField(() => AggregateExchangeRateVote)
  public async aggregateVote(@Args() args: GetRequiredValidatorArgs): Promise<AggregateExchangeRateVote> {
    return this.oracleService.aggregateVote(args.validator, args.height)
  }

  @ResolveField(() => OracleParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<OracleParams> {
    return this.oracleService.parameters(args.height)
  }
}
