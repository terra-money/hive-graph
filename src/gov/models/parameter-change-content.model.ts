import { ObjectType, Field } from '@nestjs/graphql'
import { ParamChanges } from 'nestjs-terra'
import { Coin } from 'src/common/models'
import { ProposalContent } from '../interfaces'
import {
  DistributionChanges,
  GovParams,
  MarketChanges,
  MintChanges,
  OracleChanges,
  OracleWhitelist,
  SlashingChanges,
  StakingChanges,
  TreasuryChanges,
  WasmParamChanges,
} from '../models'
import { ParameterChangesUnion, ParameterChangesType } from '../unions'

export enum ParameterChangesSubspaces {
  DISTRIBUTION = 'distribution',
  STAKING = 'staking',
  SLASHING = 'slashing',
  TREASURY = 'treasury',
  ORACLE = 'oracle',
  MARKET = 'market',
  GOV = 'gov',
  MINT = 'mint',
  WASM = 'wasm',
}

@ObjectType({
  implements: () => [ProposalContent],
})
export class ParameterChangeContent implements ProposalContent {
  title: string

  description: string

  @Field(() => ParameterChangesUnion, { nullable: true })
  changes?: ParameterChangesType | null

  constructor(title: string, description: string, changes: ParamChanges) {
    this.title = title
    this.description = description
    this.changes = this.fromTerraParamChange(changes)
  }

  private fromTerraParamChange(changes: ParamChanges): ParameterChangesType | null {
    const subspaces = Object.keys(changes) ?? []

    if (subspaces.length > 1) {
      throw new Error('ParamChanges have more that one subspace.')
    }

    const subspace = subspaces?.[0]

    if (!subspace) {
      throw new TypeError('Invalid subspace on ParamChanges.')
    }

    switch (subspace) {
      case ParameterChangesSubspaces.DISTRIBUTION:
        return this.parseDistributionChange(changes)
      case ParameterChangesSubspaces.STAKING:
        return this.parseStakingChanges(changes)
      case ParameterChangesSubspaces.SLASHING:
        return this.parseSlashingChanges(changes)
      case ParameterChangesSubspaces.TREASURY:
        return this.parseTreasuryChanges(changes)
      case ParameterChangesSubspaces.ORACLE:
        return this.parseOracleChanges(changes)
      case ParameterChangesSubspaces.MARKET:
        return this.parseMarketChanges(changes)
      case ParameterChangesSubspaces.GOV:
        return this.parseGovParams(changes)
      case ParameterChangesSubspaces.MINT:
        return this.parseMintChanges(changes)
      case ParameterChangesSubspaces.WASM:
        return this.parseWasmParamChanges(changes)
      default:
        return null
    }
  }

  private parseDistributionChange(changes: ParamChanges): DistributionChanges {
    const distribution = changes?.distribution ?? {}
    const distributionResult = new DistributionChanges()

    if (distribution.communitytax) {
      distributionResult.community_tax = distribution.communitytax.toString()
    }

    if (distribution.baseproposerreward) {
      distributionResult.base_proposer_reward = distribution.baseproposerreward.toString()
    }

    if (distribution.bonusproposerreward) {
      distributionResult.bonus_proposer_reward = distribution.bonusproposerreward.toString()
    }

    if (distribution.withdrawaddrenabled) {
      distributionResult.withdraw_add_renabled = distribution.withdrawaddrenabled
    }

    return distributionResult
  }

  private parseGovParams(changes: ParamChanges): GovParams {
    const gov = changes?.gov ?? {}
    const govResult = new GovParams()

    if (gov.depositparams) {
      govResult.deposit_params = {
        min_deposit: Coin.fromTerraCoins(gov.depositparams.min_deposit),
        max_deposit_period: gov.depositparams.max_deposit_period,
      }
    }

    if (gov.votingparams) {
      govResult.voting_params = {
        voting_period: gov.votingparams.voting_period,
      }
    }

    if (gov.tallyparams) {
      govResult.tally_params = {
        quorum: gov.tallyparams.quorum.toString(),
        threshold: gov.tallyparams.threshold.toString(),
        veto: gov.tallyparams.veto.toString(),
      }
    }

    return govResult
  }

  private parseMarketChanges(changes: ParamChanges): MarketChanges {
    const market = changes?.market ?? {}
    const marketResult = new MarketChanges()

    if (market.poolrecoveryperiod) {
      marketResult.pool_recovery_period = market.poolrecoveryperiod
    }

    if (market.basepool) {
      marketResult.base_pool = market.basepool.toString()
    }

    if (market.minstabilityspread) {
      marketResult.min_stability_spread = market.minstabilityspread.toString()
    }

    return marketResult
  }

  private parseMintChanges(changes: ParamChanges): MintChanges {
    const mint = changes?.mint ?? {}
    const mintResult = new MintChanges()

    if (mint.MintDenom) {
      mintResult.mint_denom = mint.MintDenom
    }

    if (mint.InflationRateChange) {
      mintResult.inflation_rate = mint.InflationRateChange.toString()
    }

    if (mint.InflationMax) {
      mintResult.inflation_max = mint.InflationMax.toString()
    }

    if (mint.InflationMin) {
      mintResult.inflation_min = mint.InflationMin.toString()
    }

    if (mint.GoalBonded) {
      mintResult.goal_bonded = mint.GoalBonded.toString()
    }

    if (mint.BlocksPerYear) {
      mintResult.blocks_per_year = mint.BlocksPerYear
    }

    return mintResult
  }

  private parseOracleChanges(changes: ParamChanges): OracleChanges {
    const oracle = changes?.oracle ?? {}
    const oracleResult = new OracleChanges()

    if (oracle.voteperiod) {
      oracleResult.vote_period = oracle.voteperiod
    }

    if (oracle.votethreshold) {
      oracleResult.vote_threshold = oracle.votethreshold.toString()
    }

    if (oracle.rewardband) {
      oracleResult.reward_band = oracle.rewardband.toString()
    }

    if (oracle.rewarddistributionwindow) {
      oracleResult.reward_distribution_window = oracle.rewarddistributionwindow
    }

    if (oracle.whitelist && oracle.whitelist.length > 0) {
      oracleResult.whitelist = oracle.whitelist.map<OracleWhitelist>((item) => ({
        name: item.name,
        tobin_tax: item.tobin_tax.toString(),
      }))
    }

    if (oracle.slashfraction) {
      oracleResult.slash_fraction = oracle.slashfraction.toString()
    }

    if (oracle.slashwindow) {
      oracleResult.slash_window = oracle.slashwindow
    }

    if (oracle.minvalidperwindow) {
      oracleResult.min_validper_window = oracle.minvalidperwindow.toString()
    }

    return oracleResult
  }

  private parseSlashingChanges(changes: ParamChanges): SlashingChanges {
    const slashing = changes?.slashing ?? {}
    const slashingResult = new SlashingChanges()

    if (slashing.MaxEvidenceAge) {
      slashingResult.max_evidence_age = slashing.MaxEvidenceAge
    }

    if (slashing.SignedBlocksWindow) {
      slashingResult.signed_blocks_window = slashing.SignedBlocksWindow
    }

    if (slashing.MinSignedPerWindow) {
      slashingResult.min_signed_per_window = slashing.MinSignedPerWindow.toString()
    }

    if (slashing.DowntimeJailDuration) {
      slashingResult.downtime_jail_duration = slashing.DowntimeJailDuration
    }

    if (slashing.SlashFractionDoubleSign) {
      slashingResult.slash_fraction_double_sign = slashing.SlashFractionDoubleSign.toString()
    }

    if (slashing.SlashFractionDowntime) {
      slashingResult.slash_fraction_downtime = slashing.SlashFractionDowntime.toString()
    }

    return slashingResult
  }
  private parseStakingChanges(changes: ParamChanges): StakingChanges {
    const staking = changes?.staking ?? {}
    const stakingResult = new StakingChanges()

    if (staking.UnbondingTime) {
      stakingResult.unbonding_time = staking.UnbondingTime
    }

    if (staking.MaxValidators) {
      stakingResult.max_validators = staking.MaxValidators
    }

    if (staking.KeyMaxEntries) {
      stakingResult.key_max_entries = staking.KeyMaxEntries
    }

    if (staking.BondDenom) {
      stakingResult.bond_denom = staking.BondDenom
    }

    return stakingResult
  }

  private parseTreasuryChanges(changes: ParamChanges): TreasuryChanges {
    const treasury = changes?.treasury ?? {}
    const treasuryResult = new TreasuryChanges()

    if (treasury.taxpolicy) {
      treasuryResult.tax_policy = {
        rate_min: treasury.taxpolicy.rate_min.toString(),
        rate_max: treasury.taxpolicy.rate_max.toString(),
        cap: {
          denom: treasury.taxpolicy.cap.denom,
          amount: treasury.taxpolicy.cap.amount.toString(),
        },
        change_max: treasury.taxpolicy.change_max.toString(),
      }
    }

    if (treasury.rewardpolicy) {
      treasuryResult.reward_policy = {
        rate_min: treasury.rewardpolicy.rate_min.toString(),
        rate_max: treasury.rewardpolicy.rate_max.toString(),
        cap: {
          denom: treasury.rewardpolicy.cap.denom,
          amount: treasury.rewardpolicy.cap.amount.toString(),
        },
        change_max: treasury.rewardpolicy.change_max.toString(),
      }
    }

    if (treasury.seigniorageburdentarget) {
      treasuryResult.seigniorage_burden_target = treasury.seigniorageburdentarget.toString()
    }

    if (treasury.miningincrement) {
      treasuryResult.mining_increment = treasury.miningincrement.toString()
    }

    if (treasury.windowshort) {
      treasuryResult.window_short = treasury.windowshort
    }

    if (treasury.windowlong) {
      treasuryResult.window_long = treasury.windowlong
    }

    if (treasury.windowprobation) {
      treasuryResult.window_probation = treasury.windowprobation
    }

    return treasuryResult
  }

  private parseWasmParamChanges(changes: ParamChanges): WasmParamChanges {
    const wasm = changes?.wasm ?? {}
    const wasmResult = new WasmParamChanges()

    if (wasm.maxcontractsize) {
      wasmResult.max_contract_size = wasm.maxcontractsize
    }

    if (wasm.maxcontractgas) {
      wasmResult.max_contract_gas = wasm.maxcontractgas
    }

    if (wasm.maxcontractmsgsize) {
      wasmResult.max_contract_msg_size = wasm.maxcontractmsgsize
    }

    return wasmResult
  }
}
