import { ObjectType, Field } from '@nestjs/graphql'
import { ProposalContent } from '../interfaces'

@ObjectType({
  implements: () => [ProposalContent],
})
export class RewardWeightUpdateContent implements ProposalContent {
  title: string

  description: string

  @Field()
  reward_weight: string

  constructor(title: string, description: string, rewardWeight: string) {
    this.title = title
    this.description = description
    this.reward_weight = rewardWeight
  }
}
