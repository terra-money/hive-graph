import { Field, ObjectType } from '@nestjs/graphql'
import { AccAddress } from 'nestjs-terra'
import { VoteOption } from 'src/common/enums'

@ObjectType()
export class Vote {
  @Field()
  proposal_id!: number

  @Field(() => String)
  voter!: AccAddress

  @Field(() => VoteOption)
  option!: string
}
