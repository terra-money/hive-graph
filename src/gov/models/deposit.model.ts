import { Field, ObjectType } from '@nestjs/graphql'
import { AccAddress } from 'nestjs-terra'
import { Coin } from 'src/common/models'

@ObjectType()
export class Deposit {
  @Field()
  proposal_id!: number

  @Field(() => String)
  depositor!: AccAddress

  @Field(() => [Coin])
  amount!: Coin[]
}
