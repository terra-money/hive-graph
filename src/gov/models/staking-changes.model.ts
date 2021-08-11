import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class StakingChanges {
  @Field(() => Int, { nullable: true })
  unbonding_time?: number

  @Field(() => Int, { nullable: true })
  max_validators?: number

  @Field(() => Int, { nullable: true })
  key_max_entries?: number

  @Field({ nullable: true })
  bond_denom?: string
}
