import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Validator as TerraValidator } from 'nestjs-terra'

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

  static fromTerraValidator(validator: TerraValidator): Validator {
    return {
      operator_address: validator.operator_address,
      consensus_pubkey: validator.consensus_pubkey,
      jailed: validator.jailed,
      status: validator.status,
      tokens: validator.tokens.toString(),
      delegator_shares: validator.delegator_shares.toString(),
      description: {
        moniker: validator.description.moniker,
        identity: validator.description.identity,
        website: validator.description.website,
        details: validator.description.details,
        security_contact: validator.description.security_contact,
      },
      unbonding_height: validator.unbonding_height,
      unbonding_time: validator.unbonding_time.toISOString(),
      commission: {
        commission_rates: {
          rate: validator.commission.commission_rates.rate.toString(),
          max_rate: validator.commission.commission_rates.max_rate.toString(),
          max_change_rate: validator.commission.commission_rates.max_change_rate.toString(),
        },
        update_time: validator.commission.update_time.toISOString(),
      },
      min_self_delegation: validator.min_self_delegation.toString(),
    }
  }
}
