import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UnbondingDelegationEntry {
  @Field()
  initial_balance!: string

  @Field()
  balance!: string

  @Field(() => Int)
  creation_height!: number

  @Field()
  completion_time!: string
}

@ObjectType()
export class UnbondingDelegation {
  @Field()
  delegator_address!: string

  @Field()
  validator_address!: string

  @Field(() => [UnbondingDelegationEntry])
  entries!: UnbondingDelegationEntry[]
}
