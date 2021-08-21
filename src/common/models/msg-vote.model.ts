import { Field, Int, ObjectType } from '@nestjs/graphql'
import { VoteOption } from '../enums'

@ObjectType()
export class MsgVote {
  @Field(() => Int)
  proposal_id!: number

  @Field()
  voter!: string

  @Field(() => VoteOption)
  option!: string

  constructor(data: MsgVote) {
    Object.assign(this, data)
  }
}
