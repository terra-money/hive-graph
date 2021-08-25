import { ObjectType, Field } from '@nestjs/graphql'
import { ProposalContent } from '../interfaces'
import { Coin, TerraCoinsType } from '../models'

@ObjectType({
  implements: () => [ProposalContent],
})
export class CommunityPoolSpendContent implements ProposalContent {
  title: string

  description: string

  @Field()
  recipient: string

  @Field(() => [Coin])
  amount: Coin[]

  constructor(title: string, description: string, recipient: string, amount: TerraCoinsType) {
    this.title = title
    this.description = description
    this.recipient = recipient
    this.amount = Coin.fromTerraCoins(amount)
  }
}
