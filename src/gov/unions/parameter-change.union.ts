import { createUnionType } from '@nestjs/graphql'
import {
  SlashingParams,
  OracleParams,
  MintingParams,
  MarketParams,
  DistributionParams,
  StakingParams,
} from 'src/common/models'
import { GovParams, TreasuryChanges, WasmParamChanges } from '../models'

export const ParameterChangesUnion = createUnionType({
  name: 'ParameterChangesUnion',
  types: () => [
    DistributionParams,
    GovParams,
    MarketParams,
    MintingParams,
    OracleParams,
    SlashingParams,
    StakingParams,
    TreasuryChanges,
    WasmParamChanges,
  ],
})

export type ParameterChangesType = typeof ParameterChangesUnion
