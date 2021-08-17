import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Denom } from 'src/common/enums'
import { Coin, OracleParams } from 'src/common/models'
import { ExchangeRateVote, ExchangeRatePrevote, AggregateExchangeRatePrevote, AggregateExchangeRateVote } from '.'

@ObjectType()
export class Oracle {
  @Field(() => [ExchangeRateVote])
  votes!: Promise<ExchangeRateVote[]>

  @Field(() => [ExchangeRatePrevote])
  prevotes!: Promise<ExchangeRatePrevote[]>

  @Field(() => [Coin])
  exchangeRates!: Promise<Coin[]>

  @Field(() => Coin, { nullable: true })
  exchangeRate!: Promise<Coin>

  @Field(() => [Denom])
  activeDenoms!: Promise<string[]>

  @Field(() => String)
  feederAddress!: Promise<string>

  @Field(() => Int)
  misses!: Promise<number>

  @Field(() => AggregateExchangeRatePrevote)
  aggregatePrevote!: Promise<AggregateExchangeRatePrevote>

  @Field(() => AggregateExchangeRateVote)
  aggregateVote!: Promise<AggregateExchangeRateVote>

  @Field(() => OracleParams)
  parameters!: Promise<OracleParams>
}
