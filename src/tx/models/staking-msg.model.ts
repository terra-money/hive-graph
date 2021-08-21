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

  constructor(data: MsgDelegate) {
    Object.assign(this, data)
  }
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

  constructor(data: MsgBeginRedelegate) {
    Object.assign(this, data)
  }
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

  constructor(data: MsgCreateValidator) {
    Object.assign(this, data)
  }
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

  constructor(data: MsgEditValidator) {
    Object.assign(this, data)
  }
}

export class StakingMsg {
  static fromTerraMsg(msg: TerraStakingMsg): MsgDelegate | MsgBeginRedelegate | MsgCreateValidator | MsgEditValidator {
    if (msg instanceof TerraMsgDelegate || msg instanceof TerraMsgUndelegate) {
      return new MsgDelegate({
        delegator_address: msg.delegator_address,
        validator_address: msg.delegator_address,
        amount: Coin.fromTerraCoin(msg.amount),
      })
    }

    if (msg instanceof TerraMsgBeginRedelegate) {
      return new MsgBeginRedelegate({
        delegator_address: msg.delegator_address,
        validator_src_address: msg.validator_src_address,
        validator_dst_address: msg.validator_dst_address,
        amount: Coin.fromTerraCoin(msg.amount),
      })
    }

    if (msg instanceof TerraMsgCreateValidator) {
      return new MsgCreateValidator({
        description: ValidatorDescription.fromTerra(msg.description),
        commission: CommissionRates.fromTerra(msg.commission),
        min_self_delegation: msg.min_self_delegation.toString(),
        delegator_address: msg.delegator_address,
        validator_address: msg.validator_address,
        pubkey: msg.pubkey,
        value: Coin.fromTerraCoin(msg.value),
      })
    }

    return new MsgEditValidator({
      description: ValidatorDescription.fromTerra(msg.description),
      address: msg.address,
      commission_rate: msg.commission_rate?.toString(),
      min_self_delegation: msg.min_self_delegation?.toString(),
    })
  }
}
