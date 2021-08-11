import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GovService } from './gov.service'
import { Gov, Proposal, DepositParams, Deposit, Vote, Tally, VotingParams, TallyParams, GovParams } from './models'

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
  public async proposal(@Args('proposalId') proposalId: number): Promise<Proposal> {
    return this.govService.proposal(proposalId)
  }

  @ResolveField(() => String)
  public async proposer(@Args('proposalId') proposalId: number): Promise<string> {
    return this.govService.proposer(proposalId)
  }

  @ResolveField(() => [Deposit])
  public async deposits(@Args('proposalId') proposalId: number): Promise<Deposit[]> {
    return this.govService.deposits(proposalId)
  }

  @ResolveField(() => [Vote])
  public async votes(@Args('proposalId') proposalId: number): Promise<Vote[]> {
    return this.govService.votes(proposalId)
  }

  @ResolveField(() => Tally)
  public async tally(@Args('proposalId') proposalId: number): Promise<Tally> {
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
