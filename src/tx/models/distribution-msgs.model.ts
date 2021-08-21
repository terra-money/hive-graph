import { Field, ObjectType } from '@nestjs/graphql'
import {
  DistributionMsg as TerraDistributionMsg,
  MsgModifyWithdrawAddress as TerraMsgModifyWithdrawAddress,
  MsgWithdrawDelegationReward as TerraMsgWithdrawDelegationReward,
  MsgWithdrawValidatorCommission as TerraMsgWithdrawValidatorCommission,
} from 'nestjs-terra'
import { Coin } from 'src/common/models'

@ObjectType()
export class MsgModifyWithdrawAddress {
  @Field()
  delegator_address!: string

  @Field()
  withdraw_address!: string
}

@ObjectType()
export class MsgWithdrawDelegationReward {
  @Field()
  delegator_address!: string

  @Field()
  validator_address!: string
}

@ObjectType()
export class MsgWithdrawValidatorCommission {
  @Field()
  validator_address!: string
}

@ObjectType()
export class MsgFundCommunityPool {
  @Field()
  depositor!: string

  @Field(() => [Coin])
  amount!: Coin[]
}

export class DistributionMsg {
  static fromTerraMsg(
    msg: TerraDistributionMsg,
  ): MsgModifyWithdrawAddress | MsgWithdrawDelegationReward | MsgWithdrawValidatorCommission | MsgFundCommunityPool {
    if (msg instanceof TerraMsgModifyWithdrawAddress) {
      return {
        delegator_address: msg.delegator_address,
        withdraw_address: msg.withdraw_address,
      }
    }

    if (msg instanceof TerraMsgWithdrawDelegationReward) {
      return {
        delegator_address: msg.delegator_address,
        validator_address: msg.validator_address,
      }
    }

    if (msg instanceof TerraMsgWithdrawValidatorCommission) {
      return {
        validator_address: msg.validator_address,
      }
    }

    return {
      depositor: msg.depositor,
      amount: Coin.fromTerraCoins(msg.amount),
    }
  }
}
