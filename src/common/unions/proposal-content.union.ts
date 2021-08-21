import { createUnionType } from '@nestjs/graphql'
import {
  CommunityPoolSpendContent,
  ParameterChangeContent,
  RewardWeightUpdateContent,
  TaxRateUpdateContent,
  TextContent,
} from '../models'

export const ProposalContentUnion = createUnionType({
  name: 'ProposalContentUnion',
  types: () => [
    CommunityPoolSpendContent,
    ParameterChangeContent,
    RewardWeightUpdateContent,
    TaxRateUpdateContent,
    TextContent,
  ],
})

export type ProposalContentType = typeof ProposalContentUnion
