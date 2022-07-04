import { Field, Int, ObjectType } from '@nestjs/graphql'
import { bondStatusFromJSON } from '@terra-money/terra.proto/cosmos/staking/v1beta1/staking'
import { Validator as TerraValidator } from 'src/lcd'
import { ValConsPublicKey } from './public-key.model'

@ObjectType()
export class CommissionRates {
  @Field()
  rate!: string

  @Field()
  max_rate!: string

  @Field()
  max_change_rate!: string

  static fromTerra(rates: TerraValidator.CommissionRates): CommissionRates {
    return {
      rate: rates.rate.toString(),
      max_rate: rates.max_rate.toString(),
      max_change_rate: rates.max_change_rate.toString(),
    }
  }
}

@ObjectType()
export class ValidatorCommission {
  @Field(() => CommissionRates)
  commission_rates!: CommissionRates

  @Field()
  update_time!: string

  static fromTerra(commission: TerraValidator.Commission): ValidatorCommission {
    return {
      commission_rates: CommissionRates.fromTerra(commission.commission_rates),
      update_time: commission.update_time.toISOString(),
    }
  }
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

  static fromTerra(description: TerraValidator.Description): ValidatorDescription {
    return {
      moniker: description.moniker,
      identity: description.identity,
      website: description.website,
      details: description.details,
      security_contact: description.security_contact,
    }
  }
}

@ObjectType()
export class Validator {
  @Field()
  operator_address!: string

  @Field(() => ValConsPublicKey)
  consensus_pubkey!: ValConsPublicKey

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

  @Field(() => ValidatorCommission)
  commission!: ValidatorCommission

  @Field()
  min_self_delegation!: string

  static fromTerraValidator(validator: TerraValidator): Validator {
    return {
      operator_address: validator.operator_address,
      consensus_pubkey: { key: validator.consensus_pubkey.key },
      jailed: validator.jailed,
      // terra.js should be fixed to return number
      status: typeof validator.status === 'string' ? bondStatusFromJSON(validator.status) : validator.status,
      tokens: validator.tokens.toString(),
      delegator_shares: validator.delegator_shares.toString(),
      description: ValidatorDescription.fromTerra(validator.description),
      unbonding_height: validator.unbonding_height,
      unbonding_time: validator.unbonding_time.toISOString(),
      commission: ValidatorCommission.fromTerra(validator.commission),
      min_self_delegation: validator.min_self_delegation.toString(),
    }
  }
}
