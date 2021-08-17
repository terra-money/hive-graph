import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CommissionRates {
  @Field()
  rate!: string

  @Field()
  max_rate!: string

  @Field()
  max_change_rate!: string
}

@ObjectType()
export class Commission {
  @Field(() => CommissionRates)
  commission_rates!: CommissionRates

  @Field()
  update_time!: string
}

@ObjectType()
export class ValidatorDescription {
  @Field()
  moniker!: string

  @Field()
  identity!: string

  @Field()
  website!: string

  @Field()
  details!: string

  @Field()
  security_contact!: string
}

@ObjectType()
export class Validator {
  @Field()
  operator_address!: string

  @Field()
  consensus_pubkey!: string

  @Field()
  jailed!: boolean

  @Field(() => Int)
  status!: number

  @Field()
  tokens!: string

  @Field()
  delegator_shares!: string

  @Field(() => ValidatorDescription)
  description!: ValidatorDescription

  @Field(() => Int)
  unbonding_height!: number

  @Field()
  unbonding_time!: string

  @Field(() => Commission)
  commission!: Commission

  @Field()
  min_self_delegation!: string
}
