import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ProposalStatus } from 'src/common/enums'
import { Coin } from 'src/common/models'
import { ProposalContentUnion, ProposalContentType } from '../unions'
import { Tally } from './tally.model'

@ObjectType()
export class Proposal {
  @Field(() => ID)
  id!: number

  @Field(() => ProposalContentUnion)
  content!: ProposalContentType

  @Field(() => ProposalStatus)
  proposal_status!: string

  @Field(() => Tally)
  final_tally_result?: Tally

  @Field()
  submit_time!: string

  @Field()
  deposit_end_time!: string

  @Field(() => [Coin])
  total_deposit!: Coin[]

  @Field()
  voting_start_time!: string

  @Field()
  voting_end_time!: string
}
