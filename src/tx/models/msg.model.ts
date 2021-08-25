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
  MsgMigrateCode,
  MsgUpdateContractAdmin,
  MsgClearContractAdmin,
} from 'nestjs-terra'
import {
  Msg as LegacyTerraMsg,
  MsgSend as LegacyMsgSend,
  MsgMultiSend as LegacyMsgMultiSend,
  MsgModifyWithdrawAddress as LegacyMsgModifyWithdrawAddress,
  MsgWithdrawDelegationReward as LegacyMsgWithdrawDelegationReward,
  MsgWithdrawValidatorCommission as LegacyMsgWithdrawValidatorCommission,
  MsgFundCommunityPool as LegacyMsgFundCommunityPool,
  MsgDeposit as LegacyMsgDeposit,
  MsgSubmitProposal as LegacyMsgSubmitProposal,
  MsgVote as LegacyMsgVote,
  MsgSwapSend as LegacyMsgSwapSend,
  MsgSwap as LegacyMsgSwap,
  MsgGrantAuthorization as LegacyMsgGrantAuthorization,
  MsgRevokeAuthorization as LegacyMsgRevokeAuthorization,
  MsgExecAuthorized as LegacyMsgExecAuthorized,
  MsgDelegateFeedConsent as LegacyMsgDelegateFeedConsent,
  MsgAggregateExchangeRateVote as LegacyMsgAggregateExchangeRateVote,
  MsgAggregateExchangeRatePrevote as LegacyMsgAggregateExchangeRatePrevote,
  MsgDelegate as LegacyMsgDelegate,
  MsgUndelegate as LegacyMsgUndelegate,
  MsgBeginRedelegate as LegacyMsgBeginRedelegate,
  MsgCreateValidator as LegacyMsgCreateValidator,
  MsgEditValidator as LegacyMsgEditValidator,
  MsgStoreCode as LegacyMsgStoreCode,
  MsgInstantiateContract as LegacyMsgInstantiateContract,
  MsgExecuteContract as LegacyMsgExecuteContract,
  MsgMigrateContract as LegacyMsgMigrateContract,
  MsgExchangeRateVote as LegacyMsgExchangeRateVote,
  MsgExchangeRatePrevote as LegacyMsgExchangeRatePrevote,
  MsgUpdateContractOwner as LegacyMsgUpdateContractOwner,
} from 'nestjs-terra-legacy'
import {
  BankMsg,
  DistributionMsg,
  GovMsg,
  MarketMsg,
  MsgAuthMsg,
  OracleMsg,
  StakingMsg,
  WasmMsg,
  MsgUnjail,
} from '../models'
import { MsgType } from '../unions'

export class Msg {
  static fromTerraMsg(msg: TerraMsg | LegacyTerraMsg): MsgType {
    if (
      msg instanceof MsgSend ||
      msg instanceof MsgMultiSend ||
      msg instanceof LegacyMsgSend ||
      msg instanceof LegacyMsgMultiSend
    ) {
      return BankMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgModifyWithdrawAddress ||
      msg instanceof MsgWithdrawDelegationReward ||
      msg instanceof MsgWithdrawValidatorCommission ||
      msg instanceof MsgFundCommunityPool ||
      msg instanceof LegacyMsgModifyWithdrawAddress ||
      msg instanceof LegacyMsgWithdrawDelegationReward ||
      msg instanceof LegacyMsgWithdrawValidatorCommission ||
      msg instanceof LegacyMsgFundCommunityPool
    ) {
      return DistributionMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgDeposit ||
      msg instanceof MsgSubmitProposal ||
      msg instanceof MsgVote ||
      msg instanceof LegacyMsgDeposit ||
      msg instanceof LegacyMsgSubmitProposal ||
      msg instanceof LegacyMsgVote
    ) {
      return GovMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgSwapSend ||
      msg instanceof MsgSwap ||
      msg instanceof LegacyMsgSwapSend ||
      msg instanceof LegacyMsgSwap
    ) {
      return MarketMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgGrantAuthorization ||
      msg instanceof MsgRevokeAuthorization ||
      msg instanceof MsgExecAuthorized ||
      msg instanceof LegacyMsgGrantAuthorization ||
      msg instanceof LegacyMsgRevokeAuthorization ||
      msg instanceof LegacyMsgExecAuthorized
    ) {
      return MsgAuthMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgDelegateFeedConsent ||
      msg instanceof MsgAggregateExchangeRateVote ||
      msg instanceof MsgAggregateExchangeRatePrevote ||
      msg instanceof LegacyMsgDelegateFeedConsent ||
      msg instanceof LegacyMsgAggregateExchangeRateVote ||
      msg instanceof LegacyMsgAggregateExchangeRatePrevote ||
      msg instanceof LegacyMsgExchangeRateVote ||
      msg instanceof LegacyMsgExchangeRatePrevote
    ) {
      return OracleMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgDelegate ||
      msg instanceof MsgUndelegate ||
      msg instanceof MsgBeginRedelegate ||
      msg instanceof MsgCreateValidator ||
      msg instanceof MsgEditValidator ||
      msg instanceof LegacyMsgDelegate ||
      msg instanceof LegacyMsgUndelegate ||
      msg instanceof LegacyMsgBeginRedelegate ||
      msg instanceof LegacyMsgCreateValidator ||
      msg instanceof LegacyMsgEditValidator
    ) {
      return StakingMsg.fromTerraMsg(msg)
    }

    if (
      msg instanceof MsgStoreCode ||
      msg instanceof MsgInstantiateContract ||
      msg instanceof MsgExecuteContract ||
      msg instanceof MsgMigrateContract ||
      msg instanceof MsgMigrateCode ||
      msg instanceof MsgUpdateContractAdmin ||
      msg instanceof MsgClearContractAdmin ||
      msg instanceof LegacyMsgStoreCode ||
      msg instanceof LegacyMsgInstantiateContract ||
      msg instanceof LegacyMsgExecuteContract ||
      msg instanceof LegacyMsgMigrateContract ||
      msg instanceof LegacyMsgUpdateContractOwner
    ) {
      return WasmMsg.fromTerraMsg(msg)
    }

    return new MsgUnjail(msg)
  }

  static fromTerraMsgs(msgs: TerraMsg[] | LegacyTerraMsg[]): MsgType[] {
    return msgs.map<MsgType>(Msg.fromTerraMsg)
  }
}
