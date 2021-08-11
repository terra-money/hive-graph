import { ObjectType } from '@nestjs/graphql'
import { ProposalContent } from '../interfaces'

@ObjectType({
  implements: () => [ProposalContent],
})
export class TextContent implements ProposalContent {
  title: string

  description: string

  constructor(title: string, description: string) {
    this.title = title
    this.description = description
  }
}
