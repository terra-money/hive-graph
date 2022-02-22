import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Coin, OracleParams } from 'src/common/models'
import { AggregateExchangeRatePrevote, AggregateExchangeRateVote } from '.'

@ObjectType()
export class Oracle {
  @Field(() => [Coin])
  exchangeRates!: Promise<Coin[]>

  @Field(() => Coin, { nullable: true })
  exchangeRate!: Promise<Coin>

  @Field(() => [String])
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
