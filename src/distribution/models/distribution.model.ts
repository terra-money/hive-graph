import { Field, ObjectType } from '@nestjs/graphql'
import { Coin, DistributionParams } from 'src/common/models'
import { Rewards } from './rewards.model'
import { ValidatorRewards } from './validator-rewards.model'

@ObjectType()
export class Distribution {
  @Field(() => Rewards)
  rewards!: Promise<Rewards>

  @Field(() => ValidatorRewards)
  validatorRewards!: Promise<ValidatorRewards>

  @Field(() => String)
  withdrawAddress!: Promise<string>

  @Field(() => [Coin])
  communityPool!: Promise<Coin[]>

  @Field(() => DistributionParams)
  parameters!: Promise<DistributionParams>
}
