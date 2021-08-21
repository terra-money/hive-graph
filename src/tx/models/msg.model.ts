import {
  Msg as TerraMsg,
  MsgSend,
  MsgMultiSend,
  MsgModifyWithdrawAddress,
  MsgWithdrawDelegationReward,
  MsgWithdrawValidatorCommission,
  MsgFundCommunityPool,
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgSwapSend,
  MsgSwap,
  MsgGrantAuthorization,
  MsgRevokeAuthorization,
  MsgExecAuthorized,
  MsgExchangeRateVote,
  MsgExchangeRatePrevote,
  MsgDelegateFeedConsent,
  MsgAggregateExchangeRateVote,
  MsgAggregateExchangeRatePrevote,
  MsgDelegate,
  MsgUndelegate,
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgEditValidator,
  MsgStoreCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  MsgMigrateContract,
  MsgUpdateContractOwner,
} from 'nestjs-terra'
import { BankMsg, DistributionMsg, GovMsg, MarketMsg, MsgAuthMsg, OracleMsg, StakingMsg, WasmMsg } from '../models'
import { MsgType } from '../unions'

export class Msg {
  static fromTerraMsg(msg: TerraMsg): MsgType {
    if (msg instanceof MsgSend || msg instanceof MsgMultiSend) {
      return BankMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgModifyWithdrawAddress ||
      msg instanceof MsgWithdrawDelegationReward ||
      msg instanceof MsgWithdrawValidatorCommission ||
      msg instanceof MsgFundCommunityPool
    ) {
      return DistributionMsg.fromTerraMsg(msg)
    }

    if (msg instanceof MsgDeposit || msg instanceof MsgSubmitProposal || msg instanceof MsgVote) {
      return GovMsg.fromTerraMsg(msg)
    }

    if (msg instanceof MsgSwapSend || msg instanceof MsgSwap) {
      return MarketMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgGrantAuthorization ||
      msg instanceof MsgRevokeAuthorization ||
      msg instanceof MsgExecAuthorized
    ) {
      return MsgAuthMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgExchangeRateVote ||
      msg instanceof MsgExchangeRatePrevote ||
      msg instanceof MsgDelegateFeedConsent ||
      msg instanceof MsgAggregateExchangeRateVote ||
      msg instanceof MsgAggregateExchangeRatePrevote
    ) {
      return OracleMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgDelegate ||
      msg instanceof MsgUndelegate ||
      msg instanceof MsgBeginRedelegate ||
      msg instanceof MsgCreateValidator ||
      msg instanceof MsgEditValidator
    ) {
      return StakingMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgStoreCode ||
      msg instanceof MsgInstantiateContract ||
      msg instanceof MsgExecuteContract ||
      msg instanceof MsgMigrateContract ||
      msg instanceof MsgUpdateContractOwner
    ) {
      return WasmMsg.fromTerraMsg(msg)
    }

    return msg
  }

  static fromTerraMsgs(msgs: TerraMsg[]): MsgType[] {
    return msgs.map<MsgType>(Msg.fromTerraMsg)
  }
}
