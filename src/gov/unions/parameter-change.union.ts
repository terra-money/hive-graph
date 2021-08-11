import { createUnionType } from '@nestjs/graphql'
import {
  DistributionChanges,
  GovParams,
  MarketChanges,
  MintChanges,
  OracleChanges,
  SlashingChanges,
  StakingChanges,
  TreasuryChanges,
  WasmParamChanges,
} from '../models'

export const ParameterChangesUnion = createUnionType({
  name: 'ParameterChangesUnion',
  types: () => [
    DistributionChanges,
    GovParams,
    MarketChanges,
    MintChanges,
    OracleChanges,
    SlashingChanges,
    StakingChanges,
    TreasuryChanges,
    WasmParamChanges,
  ],
})

export type ParameterChangesType = typeof ParameterChangesUnion
