import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class ValidatorRewards {
  @Field(() => [Coin])
  self_bond_rewards!: Coin[]

  @Field(() => [Coin])
  val_commission!: Coin[]
}
