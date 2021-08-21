import { Field, ObjectType } from '@nestjs/graphql'
import { GovMsg as TerraGovMsg, MsgDeposit as TerraMsgDeposit, MsgVote as TerraMsgVote } from 'nestjs-terra'
import { Coin, MsgDeposit, MsgVote, ProposalContent } from 'src/common/models'
import { ProposalContentUnion, ProposalContentType } from 'src/common/unions'

@ObjectType()
export class MsgSubmitProposal {
  @Field(() => ProposalContentUnion)
  content!: ProposalContentType

  @Field(() => [Coin])
  initial_deposit!: Coin[]

  @Field()
  proposer!: string
}

export class GovMsg {
  static fromTerraMsg(msg: TerraGovMsg): MsgSubmitProposal | MsgDeposit | MsgVote {
    if (msg instanceof TerraMsgDeposit) {
      return {
        proposal_id: msg.proposal_id,
        depositor: msg.depositor,
        amount: Coin.fromTerraCoins(msg.amount),
      }
    }

    if (msg instanceof TerraMsgVote) {
      return {
        proposal_id: msg.proposal_id,
        voter: msg.voter,
        option: msg.option,
      }
    }

    return {
      content: ProposalContent.fromTerra(msg.content),
      initial_deposit: Coin.fromTerraCoins(msg.initial_deposit),
      proposer: msg.proposer,
    }
  }
}
