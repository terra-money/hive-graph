import { Proposal as TerraProposal, CommunityPoolSpendProposal, ParameterChangeProposal } from 'nestjs-terra'
import {
  Proposal as LegacyTerraProposal,
  CommunityPoolSpendProposal as LegacyCommunityPoolSpendProposal,
  ParameterChangeProposal as LegacyParameterChangeProposal,
  RewardWeightUpdateProposal as LegacyRewardWeightUpdateProposal,
  TaxRateUpdateProposal as LegacyTaxRateUpdateProposal,
} from 'nestjs-terra-legacy'
import {
  CommunityPoolSpendContent,
  ParameterChangeContent,
  RewardWeightUpdateContent,
  TaxRateUpdateContent,
  TextContent,
} from 'src/common/models'
import { ProposalContentType } from 'src/common/unions'

export class ProposalContent {
  static fromTerra(content: TerraProposal.Content | LegacyTerraProposal.Content): ProposalContentType {
    const { title, description } = content ?? {}

    if (content instanceof CommunityPoolSpendProposal || content instanceof LegacyCommunityPoolSpendProposal) {
      return new CommunityPoolSpendContent(title, description, content.recipient, content.amount)
    }

    if (content instanceof LegacyTaxRateUpdateProposal) {
      return new TaxRateUpdateContent(title, description, content.tax_rate.toString())
    }

    if (content instanceof LegacyRewardWeightUpdateProposal) {
      return new RewardWeightUpdateContent(title, description, content.reward_weight.toString())
    }
    if (content instanceof ParameterChangeProposal || content instanceof LegacyParameterChangeProposal) {
      return new ParameterChangeContent(title, description, content.changes)
    }

    return new TextContent(title, description)
  }
}
