import { Field, ObjectType } from '@nestjs/graphql'
import { Proposal, DepositParams, Deposit, Vote, Tally, VotingParams, TallyParams, GovParams } from './'

@ObjectType()
export class Gov {
  @Field(() => [Proposal])
  proposals!: Promise<Proposal[]>

  @Field(() => Proposal)
  proposal!: Promise<Proposal>

  @Field(() => String)
  proposer!: Promise<string>

  @Field(() => [Deposit])
  deposits!: Promise<Deposit[]>

  @Field(() => [Vote])
  votes!: Promise<Vote[]>

  @Field(() => Tally)
  tally!: Promise<Tally>

  @Field(() => DepositParams)
  depositParameters!: Promise<DepositParams>

  @Field(() => VotingParams)
  votingParameters!: Promise<VotingParams>

  @Field(() => TallyParams)
  tallyParameters!: Promise<TallyParams>

  @Field(() => GovParams)
  parameters!: Promise<GovParams>
}
