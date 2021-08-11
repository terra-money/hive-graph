import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { AccAddress, MsgVote } from 'nestjs-terra'

registerEnumType(MsgVote.Option, {
  name: 'MsgVoteOption',
})

@ObjectType()
export class Vote {
  @Field()
  proposal_id!: number

  @Field(() => String)
  voter!: AccAddress

  @Field(() => MsgVote.Option)
  option!: MsgVote.Option
}
