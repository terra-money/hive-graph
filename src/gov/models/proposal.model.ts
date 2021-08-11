import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Proposal as TerraProposal } from 'nestjs-terra'
import { Coin } from 'src/common/models'
import { ProposalContentUnion, ProposalContentType } from '../unions'
import { Tally } from './tally.model'

registerEnumType(TerraProposal.Status, {
  name: 'ProposalStatus',
})

@ObjectType()
export class Proposal {
  @Field(() => ID)
  id!: number

  @Field(() => ProposalContentUnion)
  content!: ProposalContentType

  @Field(() => TerraProposal.Status)
  proposal_status!: TerraProposal.Status

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
