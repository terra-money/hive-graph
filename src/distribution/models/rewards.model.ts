import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { RewardItem } from './reward-item.model'

@ObjectType()
export class Rewards {
  @Field(() => [RewardItem])
  rewards!: RewardItem[]

  @Field(() => [Coin])
  total!: Coin[]
}
