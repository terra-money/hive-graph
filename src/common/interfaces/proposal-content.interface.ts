import { Field, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class ProposalContent {
  @Field()
  title!: string

  @Field()
  description!: string
}
