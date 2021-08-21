import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Coin } from '../models'

@ObjectType()
export class MsgDeposit {
  @Field(() => Int)
  proposal_id!: number

  @Field()
  depositor!: string

  @Field(() => [Coin])
  amount!: Coin[]

  constructor(data: MsgDeposit) {
    Object.assign(this, data)
  }
}
