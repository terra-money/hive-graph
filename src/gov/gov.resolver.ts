import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { DepositParams, MsgDeposit, MsgVote, VotingParams, TallyParams, GovParams } from 'src/common/models'
import { GovService } from './gov.service'
import { Gov, Proposal, Tally } from './models'

@Resolver(Gov)
export class GovResolver {
  constructor(private readonly govService: GovService) {}

  @Query(() => Gov)
  public async gov(): Promise<Gov> {
    return {} as Gov
  }

  @ResolveField(() => [Proposal])
  public async proposals(): Promise<Proposal[]> {
    return this.govService.proposals()
  }

  @ResolveField(() => Proposal)
  public async proposal(@Args('proposalId', { type: () => Int }) proposalId: number): Promise<Proposal> {
    return this.govService.proposal(proposalId)
  }

  @ResolveField(() => String)
  public async proposer(@Args('proposalId', { type: () => Int }) proposalId: number): Promise<string> {
    return this.govService.proposer(proposalId)
  }

  @ResolveField(() => [MsgDeposit])
  public async deposits(@Args('proposalId', { type: () => Int }) proposalId: number): Promise<MsgDeposit[]> {
    return this.govService.deposits(proposalId)
  }

  @ResolveField(() => [MsgVote])
  public async votes(@Args('proposalId', { type: () => Int }) proposalId: number): Promise<MsgVote[]> {
    return this.govService.votes(proposalId)
  }

  @ResolveField(() => Tally)
  public async tally(@Args('proposalId', { type: () => Int }) proposalId: number): Promise<Tally> {
    return this.govService.tally(proposalId)
  }

  @ResolveField(() => DepositParams)
  public async depositParameters(): Promise<DepositParams> {
    return this.govService.depositParameters()
  }

  @ResolveField(() => VotingParams)
  public async votingParameters(): Promise<VotingParams> {
    return this.govService.votingParameters()
  }

  @ResolveField(() => TallyParams)
  public async tallyParameters(): Promise<TallyParams> {
    return this.govService.tallyParameters()
  }

  @ResolveField(() => GovParams)
  public async parameters(): Promise<GovParams> {
    return this.govService.parameters()
  }
}
