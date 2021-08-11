import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class PolicyConstraints {
  @Field()
  rate_min!: string

  @Field()
  rate_max!: string

  @Field(() => Coin)
  cap!: Coin

  @Field()
  change_max!: string
}

@ObjectType()
export class TreasuryChanges {
  @Field(() => PolicyConstraints, { nullable: true })
  tax_policy?: PolicyConstraints

  @Field(() => PolicyConstraints, { nullable: true })
  reward_policy?: PolicyConstraints

  @Field({ nullable: true })
  seigniorage_burden_target?: string

  @Field({ nullable: true })
  mining_increment?: string

  @Field(() => Int, { nullable: true })
  window_short?: number

  @Field(() => Int, { nullable: true })
  window_long?: number

  @Field(() => Int, { nullable: true })
  window_probation?: number
}
