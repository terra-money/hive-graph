import { Field, ObjectType } from '@nestjs/graphql'
import {
  DistributionMsg as TerraDistributionMsg,
  MsgModifyWithdrawAddress as TerraMsgModifyWithdrawAddress,
  MsgWithdrawDelegationReward as TerraMsgWithdrawDelegationReward,
  MsgWithdrawValidatorCommission as TerraMsgWithdrawValidatorCommission,
} from 'nestjs-terra'
import {
  DistributionMsg as LegacyTerraDistributionMsg,
  MsgModifyWithdrawAddress as LegacyMsgModifyWithdrawAddress,
  MsgWithdrawDelegationReward as LegacyMsgWithdrawDelegationReward,
  MsgWithdrawValidatorCommission as LegacyMsgWithdrawValidatorCommission,
} from 'nestjs-terra-legacy'
import { Coin } from 'src/common/models'

@ObjectType()
export class MsgModifyWithdrawAddress {
  @Field()
  delegator_address!: string

  @Field()
  withdraw_address!: string

  constructor(data: MsgModifyWithdrawAddress) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgWithdrawDelegationReward {
  @Field()
  delegator_address!: string

  @Field()
  validator_address!: string

  constructor(data: MsgWithdrawDelegationReward) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgWithdrawValidatorCommission {
  @Field()
  validator_address!: string

  constructor(data: MsgWithdrawValidatorCommission) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgFundCommunityPool {
  @Field()
  depositor!: string

  @Field(() => [Coin])
  amount!: Coin[]

  constructor(data: MsgFundCommunityPool) {
    Object.assign(this, data)
  }
}

export class DistributionMsg {
  static fromTerraMsg(
    msg: TerraDistributionMsg | LegacyTerraDistributionMsg,
  ): MsgModifyWithdrawAddress | MsgWithdrawDelegationReward | MsgWithdrawValidatorCommission | MsgFundCommunityPool {
    if (msg instanceof TerraMsgModifyWithdrawAddress || msg instanceof LegacyMsgModifyWithdrawAddress) {
      return new MsgModifyWithdrawAddress({
        delegator_address: msg.delegator_address,
        withdraw_address: msg.withdraw_address,
      })
    }

    if (msg instanceof TerraMsgWithdrawDelegationReward || msg instanceof LegacyMsgWithdrawDelegationReward) {
      return new MsgWithdrawDelegationReward({
        delegator_address: msg.delegator_address,
        validator_address: msg.validator_address,
      })
    }

    if (msg instanceof TerraMsgWithdrawValidatorCommission || msg instanceof LegacyMsgWithdrawValidatorCommission) {
      return new MsgWithdrawValidatorCommission({
        validator_address: msg.validator_address,
      })
    }

    return new MsgFundCommunityPool({
      depositor: msg.depositor,
      amount: Coin.fromTerraCoins(msg.amount),
    })
  }
}
