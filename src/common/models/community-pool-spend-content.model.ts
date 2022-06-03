import { ObjectType, Field } from '@nestjs/graphql'
import { Coins as TerraCoins } from 'src/lcd'
import { ProposalContent } from '../interfaces'
import { Coin } from '../models'

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

  constructor(title: string, description: string, recipient: string, amount: TerraCoins) {
    this.title = title
    this.description = description
    this.recipient = recipient
    this.amount = Coin.fromTerraCoins(amount)
  }
}
