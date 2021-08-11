import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class TallyParams {
  @Field()
  quorum!: string

  @Field()
  threshold!: string

  @Field()
  veto!: string
}
