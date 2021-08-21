import { Field, ObjectType } from '@nestjs/graphql'
import { DepositParams, MsgDeposit, MsgVote, VotingParams, TallyParams, GovParams } from 'src/common/models'
import { Proposal, Tally } from './'

@ObjectType()
export class Gov {
  @Field(() => [Proposal])
  proposals!: Promise<Proposal[]>

  @Field(() => Proposal)
  proposal!: Promise<Proposal>

  @Field(() => String)
  proposer!: Promise<string>

  @Field(() => [MsgDeposit])
  deposits!: Promise<MsgDeposit[]>

  @Field(() => [MsgVote])
  votes!: Promise<MsgVote[]>

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
