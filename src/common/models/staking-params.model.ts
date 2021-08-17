import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Denom } from '../enums'

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

  @Field(() => Denom, { nullable: true })
  bond_denom?: string
}
