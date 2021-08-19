import { createUnionType } from '@nestjs/graphql'
import {
  SlashingParams,
  OracleParams,
  MintingParams,
  MarketParams,
  DistributionParams,
  StakingParams,
  TreasuryParams,
  WasmParams,
} from 'src/common/models'
import { GovParams } from '../models'

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
    WasmParams,
  ],
})

export type ParameterChangesType = typeof ParameterChangesUnion
