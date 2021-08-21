import { Proposal as TerraProposal } from 'nestjs-terra'
import {
  CommunityPoolSpendProposal,
  ParameterChangeProposal,
  RewardWeightUpdateProposal,
  TaxRateUpdateProposal,
} from 'nestjs-terra'
import {
  CommunityPoolSpendContent,
  ParameterChangeContent,
  RewardWeightUpdateContent,
  TaxRateUpdateContent,
  TextContent,
} from 'src/common/models'
import { ProposalContentType } from 'src/common/unions'

export class ProposalContent {
  static fromTerra(content: TerraProposal.Content): ProposalContentType {
    const { title, description } = content ?? {}

    if (content instanceof CommunityPoolSpendProposal) {
      return new CommunityPoolSpendContent(title, description, content.recipient, content.amount)
    }

    if (content instanceof TaxRateUpdateProposal) {
      return new TaxRateUpdateContent(title, description, content.tax_rate.toString())
    }

    if (content instanceof RewardWeightUpdateProposal) {
      return new RewardWeightUpdateContent(title, description, content.reward_weight.toString())
    }
    if (content instanceof ParameterChangeProposal) {
      return new ParameterChangeContent(title, description, content.changes)
    }

    return new TextContent(title, description)
  }
}
