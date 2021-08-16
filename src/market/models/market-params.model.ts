import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class MarketParams {
  @Field(() => Int)
  pool_recovery_period!: number

  @Field()
  base_pool!: string

  @Field()
  min_spread!: string
}
