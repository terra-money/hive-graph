import { Field, ObjectType } from '@nestjs/graphql'
import {
  StakingMsg as TerraStakingMsg,
  MsgDelegate as TerraMsgDelegate,
  MsgUndelegate as TerraMsgUndelegate,
  MsgBeginRedelegate as TerraMsgBeginRedelegate,
  MsgCreateValidator as TerraMsgCreateValidator,
} from 'nestjs-terra'
import { ValidatorDescription, Coin, CommissionRates } from 'src/common/models'

// Same as MsgUndelegate
@ObjectType()
export class MsgDelegate {
  @Field()
  delegator_address!: string

  @Field()
  validator_address!: string

  @Field(() => Coin)
  amount!: Coin
}

@ObjectType()
export class MsgBeginRedelegate {
  @Field()
  delegator_address!: string

  @Field()
  validator_src_address!: string

  @Field()
  validator_dst_address!: string

  @Field(() => Coin)
  amount!: Coin
}

@ObjectType()
export class MsgCreateValidator {
  @Field(() => ValidatorDescription)
  description!: ValidatorDescription

  @Field(() => CommissionRates)
  commission!: CommissionRates

  @Field()
  min_self_delegation!: string

  @Field()
  delegator_address!: string

  @Field()
  validator_address!: string

  @Field()
  pubkey!: string

  @Field(() => Coin)
  value!: Coin
}

@ObjectType()
export class MsgEditValidator {
  @Field(() => ValidatorDescription)
  description!: ValidatorDescription

  @Field()
  address!: string

  @Field({ nullable: true })
  commission_rate?: string

  @Field({ nullable: true })
  min_self_delegation?: string
}

export class StakingMsg {
  static fromTerraMsg(msg: TerraStakingMsg): MsgDelegate | MsgBeginRedelegate | MsgCreateValidator | MsgEditValidator {
    if (msg instanceof TerraMsgDelegate || msg instanceof TerraMsgUndelegate) {
      return {
        delegator_address: msg.delegator_address,
        validator_address: msg.delegator_address,
        amount: Coin.fromTerraCoin(msg.amount),
      }
    }

    if (msg instanceof TerraMsgBeginRedelegate) {
      return {
        delegator_address: msg.delegator_address,
        validator_src_address: msg.validator_src_address,
        validator_dst_address: msg.validator_dst_address,
        amount: Coin.fromTerraCoin(msg.amount),
      }
    }

    if (msg instanceof TerraMsgCreateValidator) {
      return {
        description: ValidatorDescription.fromTerra(msg.description),
        commission: CommissionRates.fromTerra(msg.commission),
        min_self_delegation: msg.min_self_delegation.toString(),
        delegator_address: msg.delegator_address,
        validator_address: msg.validator_address,
        pubkey: msg.pubkey,
        value: Coin.fromTerraCoin(msg.value),
      }
    }

    return {
      description: ValidatorDescription.fromTerra(msg.description),
      address: msg.address,
      commission_rate: msg.commission_rate?.toString(),
      min_self_delegation: msg.min_self_delegation?.toString(),
    }
  }
}
