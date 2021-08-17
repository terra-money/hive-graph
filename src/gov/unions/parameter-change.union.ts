import { createUnionType } from '@nestjs/graphql'
import { SlashingParams, OracleParams, MintingParams, MarketParams, DistributionParams } from 'src/common/models'
import { GovParams, StakingChanges, TreasuryChanges, WasmParamChanges } from '../models'

export const ParameterChangesUnion = createUnionType({
  name: 'ParameterChangesUnion',
  types: () => [
    DistributionParams,
    GovParams,
    MarketParams,
    MintingParams,
    OracleParams,
    SlashingParams,
    StakingChanges,
    TreasuryChanges,
    WasmParamChanges,
  ],
})

export type ParameterChangesType = typeof ParameterChangesUnion
