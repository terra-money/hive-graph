import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { ValAddress } from 'src/lcd'

@ObjectType()
export class RewardItem {
  @Field(() => String)
  validator_address!: ValAddress

  @Field(() => [Coin])
  reward!: Coin[]
}
