import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Coin } from './coin.model'

@ObjectType()
export class DepositParams {
  @Field(() => [Coin])
  min_deposit!: Coin[]

  @Field(() => Int)
  max_deposit_period!: number
}

@ObjectType()
export class VotingParams {
  @Field(() => Int)
  voting_period!: number
}

@ObjectType()
export class TallyParams {
  @Field()
  quorum!: string

  @Field()
  threshold!: string

  @Field()
  veto_threshold!: string
}

@ObjectType()
export class GovParams {
  @Field(() => DepositParams, { nullable: true })
  deposit_params?: DepositParams

  @Field(() => VotingParams, { nullable: true })
  voting_params?: VotingParams

  @Field(() => TallyParams, { nullable: true })
  tally_params?: TallyParams
}
