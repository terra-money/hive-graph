import { ObjectType, Field } from '@nestjs/graphql'
import { AccAddress, Coins as TerraCoins } from 'nestjs-terra'
import { Coin } from 'src/common/models'
import { ProposalContent } from '../interfaces'

@ObjectType({
  implements: () => [ProposalContent],
})
export class CommunityPoolSpendContent implements ProposalContent {
  title: string

  description: string

  @Field(() => String)
  recipient: AccAddress

  @Field(() => [Coin])
  amount: Coin[]

  constructor(title: string, description: string, recipient: AccAddress, amount: TerraCoins) {
    this.title = title
    this.description = description
    this.recipient = recipient
    this.amount = Coin.fromTerraCoins(amount)
  }
}
