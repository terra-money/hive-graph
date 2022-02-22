import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class StakingParams {
  @Field({ nullable: true })
  unbonding_time?: string

  @Field(() => Int, { nullable: true })
  max_validators?: number

  @Field(() => Int, { nullable: true })
  max_entries?: number

  @Field(() => Int, { nullable: true })
  historical_entries?: number

  @Field(() => String, { nullable: true })
  bond_denom?: string
}
