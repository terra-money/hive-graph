import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RedelegationEntry {
  @Field()
  initial_balance!: string

  @Field()
  balance!: string

  @Field()
  shares_dst!: string

  @Field(() => Int)
  creation_height!: number

  @Field()
  completion_time!: string
}

@ObjectType()
export class Redelegation {
  @Field()
  delegator_address!: string

  @Field()
  validator_src_address!: string

  @Field()
  validator_dst_address!: string

  @Field(() => [RedelegationEntry])
  entries!: RedelegationEntry[]
}
