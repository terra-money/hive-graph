import { ObjectType, Field } from '@nestjs/graphql'
import { ParamChanges } from 'nestjs-terra'
import { ParamChanges as LegacyParamChanges } from 'nestjs-terra-legacy'
import { ProposalContent } from '../interfaces'
import {
  Coin,
  OracleWhitelist,
  SlashingParams,
  OracleParams,
  MintingParams,
  MarketParams,
  DistributionParams,
  StakingParams,
  TreasuryParams,
  WasmParams,
  GovParams,
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

export type TerraParamChangesType = ParamChanges | LegacyParamChanges

@ObjectType({
  implements: () => [ProposalContent],
})
export class ParameterChangeContent implements ProposalContent {
  title: string

  description: string

  @Field(() => ParameterChangesUnion, { nullable: true })
  changes?: ParameterChangesType | null

  constructor(title: string, description: string, changes: TerraParamChangesType) {
    this.title = title
    this.description = description
    this.changes = this.fromTerraParamChange(changes)
  }

  private fromTerraParamChange(changes: TerraParamChangesType): ParameterChangesType | null {
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

  private parseDistributionChange(changes: TerraParamChangesType): DistributionParams {
    const distribution = changes?.distribution ?? {}
    const distributionResult = new DistributionParams()

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
      distributionResult.withdraw_addr_enabled = distribution.withdrawaddrenabled
    }

    return distributionResult
  }

  private parseGovParams(changes: TerraParamChangesType): GovParams {
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
        veto:
          'veto_threshold' in gov.tallyparams
            ? gov.tallyparams.veto_threshold.toString()
            : gov.tallyparams.veto.toString(),
      }
    }

    return govResult
  }

  private parseMarketChanges(changes: TerraParamChangesType): MarketParams {
    const market = changes?.market ?? {}
    const marketResult = new MarketParams()

    if ('poolrecoveryperiod' in market && market.poolrecoveryperiod) {
      marketResult.pool_recovery_period = market.poolrecoveryperiod
    }

    if ('PoolRecoveryPeriod' in market && market.PoolRecoveryPeriod) {
      marketResult.pool_recovery_period = market.PoolRecoveryPeriod
    }

    if ('basepool' in market && market.basepool) {
      marketResult.base_pool = market.basepool.toString()
    }

    if ('BasePool' in market && market.BasePool) {
      marketResult.base_pool = market.BasePool.toString()
    }

    if ('minstabilityspread' in market && market.minstabilityspread) {
      marketResult.min_stability_spread = market.minstabilityspread.toString()
    }

    return marketResult
  }

  private parseMintChanges(changes: TerraParamChangesType): MintingParams {
    const mint = changes?.mint ?? {}
    const mintResult = new MintingParams()

    if (mint.MintDenom) {
      mintResult.mint_denom = mint.MintDenom
    }

    if (mint.InflationRateChange) {
      mintResult.inflation_rate_change = mint.InflationRateChange.toString()
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

  private parseOracleChanges(changes: TerraParamChangesType): OracleParams {
    const oracle = changes?.oracle ?? {}
    const oracleResult = new OracleParams()

    if ('voteperiod' in oracle && oracle.voteperiod) {
      oracleResult.vote_period = oracle.voteperiod
    }

    if ('votethreshold' in oracle && oracle.votethreshold) {
      oracleResult.vote_threshold = oracle.votethreshold.toString()
    }

    if ('rewardband' in oracle && oracle.rewardband) {
      oracleResult.reward_band = oracle.rewardband.toString()
    }

    if ('rewarddistributionwindow' in oracle && oracle.rewarddistributionwindow) {
      oracleResult.reward_distribution_window = oracle.rewarddistributionwindow
    }

    if ('whitelist' in oracle && oracle.whitelist && oracle.whitelist.length > 0) {
      oracleResult.whitelist = oracle.whitelist.map<OracleWhitelist>((item) => ({
        name: item.name,
        tobin_tax: item.tobin_tax.toString(),
      }))
    }

    if ('slashfraction' in oracle && oracle.slashfraction) {
      oracleResult.slash_fraction = oracle.slashfraction.toString()
    }

    if ('slashwindow' in oracle && oracle.slashwindow) {
      oracleResult.slash_window = oracle.slashwindow
    }

    if ('minvalidperwindow' in oracle && oracle.minvalidperwindow) {
      oracleResult.min_valid_per_window = oracle.minvalidperwindow.toString()
    }

    if ('VotePeriod' in oracle && oracle.VotePeriod) {
      oracleResult.vote_period = oracle.VotePeriod
    }

    if ('VoteThreshold' in oracle && oracle.VoteThreshold) {
      oracleResult.vote_threshold = oracle.VoteThreshold.toString()
    }

    if ('RewardBand' in oracle && oracle.RewardBand) {
      oracleResult.reward_band = oracle.RewardBand.toString()
    }

    if ('RewardDistributionWindow' in oracle && oracle.RewardDistributionWindow) {
      oracleResult.reward_distribution_window = oracle.RewardDistributionWindow
    }

    if ('Whitelist' in oracle && oracle.Whitelist && oracle.Whitelist.length > 0) {
      oracleResult.whitelist = oracle.Whitelist.map<OracleWhitelist>((item) => ({
        name: item.name,
        tobin_tax: item.tobin_tax.toString(),
      }))
    }

    if ('SlashFraction' in oracle && oracle.SlashFraction) {
      oracleResult.slash_fraction = oracle.SlashFraction.toString()
    }

    if ('SlashWindow' in oracle && oracle.SlashWindow) {
      oracleResult.slash_window = oracle.SlashWindow
    }

    if ('MinValidPerWindow' in oracle && oracle.MinValidPerWindow) {
      oracleResult.min_valid_per_window = oracle.MinValidPerWindow.toString()
    }

    return oracleResult
  }

  private parseSlashingChanges(changes: TerraParamChangesType): SlashingParams {
    const slashing = changes?.slashing ?? {}
    const slashingResult = new SlashingParams()

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
      slashingResult.downtime_jail_duration = slashing.DowntimeJailDuration.toString()
    }

    if (slashing.SlashFractionDoubleSign) {
      slashingResult.slash_fraction_double_sign = slashing.SlashFractionDoubleSign.toString()
    }

    if (slashing.SlashFractionDowntime) {
      slashingResult.slash_fraction_downtime = slashing.SlashFractionDowntime.toString()
    }

    return slashingResult
  }
  private parseStakingChanges(changes: TerraParamChangesType): StakingParams {
    const staking = changes?.staking ?? {}
    const stakingResult = new StakingParams()

    if (staking.UnbondingTime) {
      stakingResult.unbonding_time = staking.UnbondingTime.toString()
    }

    if (staking.MaxValidators) {
      stakingResult.max_validators = staking.MaxValidators
    }

    if (staking.KeyMaxEntries) {
      stakingResult.max_entries = staking.KeyMaxEntries
    }

    if (staking.BondDenom) {
      stakingResult.bond_denom = staking.BondDenom
    }

    return stakingResult
  }

  private parseTreasuryChanges(changes: TerraParamChangesType): TreasuryParams {
    const treasury = changes?.treasury ?? {}
    const treasuryResult = new TreasuryParams()

    if ('taxpolicy' in treasury && treasury.taxpolicy) {
      treasuryResult.tax_policy = {
        rate_min: treasury.taxpolicy.rate_min.toString(),
        rate_max: treasury.taxpolicy.rate_max.toString(),
        cap: Coin.fromTerraCoin(treasury.taxpolicy.cap),
        change_max: treasury.taxpolicy.change_max.toString(),
      }
    }

    if ('rewardpolicy' in treasury && treasury.rewardpolicy) {
      treasuryResult.reward_policy = {
        rate_min: treasury.rewardpolicy.rate_min.toString(),
        rate_max: treasury.rewardpolicy.rate_max.toString(),
        cap: Coin.fromTerraCoin(treasury.rewardpolicy.cap),
        change_max: treasury.rewardpolicy.change_max.toString(),
      }
    }

    if ('seigniorageburdentarget' in treasury && treasury.seigniorageburdentarget) {
      treasuryResult.seigniorage_burden_target = treasury.seigniorageburdentarget.toString()
    }

    if ('miningincrement' in treasury && treasury.miningincrement) {
      treasuryResult.mining_increment = treasury.miningincrement.toString()
    }

    if ('windowshort' in treasury && treasury.windowshort) {
      treasuryResult.window_short = treasury.windowshort
    }

    if ('windowlong' in treasury && treasury.windowlong) {
      treasuryResult.window_long = treasury.windowlong
    }

    if ('windowprobation' in treasury && treasury.windowprobation) {
      treasuryResult.window_probation = treasury.windowprobation
    }

    if ('TaxPolicy' in treasury && treasury.TaxPolicy) {
      treasuryResult.tax_policy = {
        rate_min: treasury.TaxPolicy.rate_min.toString(),
        rate_max: treasury.TaxPolicy.rate_max.toString(),
        cap: Coin.fromTerraCoin(treasury.TaxPolicy.cap),
        change_max: treasury.TaxPolicy.change_rate_max.toString(),
      }
    }

    if ('RewardPolicy' in treasury && treasury.RewardPolicy) {
      treasuryResult.reward_policy = {
        rate_min: treasury.RewardPolicy.rate_min.toString(),
        rate_max: treasury.RewardPolicy.rate_max.toString(),
        cap: Coin.fromTerraCoin(treasury.RewardPolicy.cap),
        change_max: treasury.RewardPolicy.change_rate_max.toString(),
      }
    }

    if ('SeigniorageBurdenTarget' in treasury && treasury.SeigniorageBurdenTarget) {
      treasuryResult.seigniorage_burden_target = treasury.SeigniorageBurdenTarget.toString()
    }

    if ('MiningIncrement' in treasury && treasury.MiningIncrement) {
      treasuryResult.mining_increment = treasury.MiningIncrement.toString()
    }

    if ('WindowShort' in treasury && treasury.WindowShort) {
      treasuryResult.window_short = treasury.WindowShort
    }

    if ('WindowLong' in treasury && treasury.WindowLong) {
      treasuryResult.window_long = treasury.WindowLong
    }

    if ('WindowProbation' in treasury && treasury.WindowProbation) {
      treasuryResult.window_probation = treasury.WindowProbation
    }

    return treasuryResult
  }

  private parseWasmParamChanges(changes: TerraParamChangesType): WasmParams {
    const wasm = changes?.wasm ?? {}
    const wasmResult = new WasmParams()

    if ('maxcontractsize' in wasm && wasm.maxcontractsize) {
      wasmResult.max_contract_size = wasm.maxcontractsize
    }

    if ('maxcontractgas' in wasm && wasm.maxcontractgas) {
      wasmResult.max_contract_gas = wasm.maxcontractgas
    }

    if ('maxcontractmsgsize' in wasm && wasm.maxcontractmsgsize) {
      wasmResult.max_contract_msg_size = wasm.maxcontractmsgsize
    }

    if ('MaxContractSize' in wasm && wasm.MaxContractSize) {
      wasmResult.max_contract_size = wasm.MaxContractSize
    }

    if ('MaxContractGas' in wasm && wasm.MaxContractGas) {
      wasmResult.max_contract_gas = wasm.MaxContractGas
    }

    if ('MaxContractMsgSize' in wasm && wasm.MaxContractMsgSize) {
      wasmResult.max_contract_msg_size = wasm.MaxContractMsgSize
    }

    return wasmResult
  }
}
