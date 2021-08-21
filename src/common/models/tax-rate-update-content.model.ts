import { ObjectType, Field } from '@nestjs/graphql'
import { ProposalContent } from '../interfaces'

@ObjectType({
  implements: () => [ProposalContent],
})
export class TaxRateUpdateContent implements ProposalContent {
  title: string

  description: string

  @Field()
  tax_rate: string

  constructor(title: string, description: string, taxRate: string) {
    this.title = title
    this.description = description
    this.tax_rate = taxRate
  }
}
