import { Field, Int, ObjectType } from '@nestjs/graphql'
import { VoteOption } from '../enums'

@ObjectType()
export class WeightedVoteOption {
  @Field(() => VoteOption)
  option!: number

  @Field()
  weight!: string
}

@ObjectType()
export class MsgVote {
  @Field(() => Int)
  proposal_id!: number

  @Field()
  voter!: string

  @Field(() => [WeightedVoteOption])
  options!: WeightedVoteOption[]

  constructor(data: MsgVote) {
    Object.assign(this, data)
  }
}
