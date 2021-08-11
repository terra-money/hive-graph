import { ObjectType, Field } from '@nestjs/graphql'
import { DepositParams } from './deposit-params.model'
import { TallyParams } from './tally-params.model'
import { VotingParams } from './voting-params.model'

@ObjectType()
export class GovParams {
  @Field(() => DepositParams, { nullable: true })
  deposit_params?: DepositParams

  @Field(() => VotingParams, { nullable: true })
  voting_params?: VotingParams

  @Field(() => TallyParams, { nullable: true })
  tally_params?: TallyParams
}
