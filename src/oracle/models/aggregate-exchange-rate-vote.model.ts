import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class AggregateExchangeRateVote {
  @Field(() => [Coin])
  exchange_rate_tuples!: Coin[]

  @Field()
  voter!: string
}
