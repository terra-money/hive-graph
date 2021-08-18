import { createUnionType } from '@nestjs/graphql'
import {
  SlashingParams,
  OracleParams,
  MintingParams,
  MarketParams,
  DistributionParams,
  StakingParams,
  TreasuryParams,
} from 'src/common/models'
import { GovParams, WasmParamChanges } from '../models'

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
    TreasuryParams,
    WasmParamChanges,
  ],
})

export type ParameterChangesType = typeof ParameterChangesUnion
