import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class DepositParams {
  @Field(() => [Coin])
  min_deposit!: Coin[]

  @Field(() => Int)
  max_deposit_period!: number
}
