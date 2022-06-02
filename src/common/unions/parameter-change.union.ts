import { createUnionType } from '@nestjs/graphql'
import { SlashingParams, MintingParams, DistributionParams, StakingParams, WasmParams, GovParams } from '../models'

export const ParameterChangesUnion = createUnionType({
  name: 'ParameterChangesUnion',
  types: () => [DistributionParams, GovParams, MintingParams, SlashingParams, StakingParams, WasmParams],
})

export type ParameterChangesType = typeof ParameterChangesUnion
