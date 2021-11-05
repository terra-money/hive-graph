import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { DepositParams, MsgDeposit, MsgVote, VotingParams, TallyParams, GovParams } from 'src/common/models'
import { GetGovArgs } from './gov.args'
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
  public async proposals(@Args() args: GetBaseArgs): Promise<Proposal[]> {
    return this.govService.proposals(args.height)
  }

  @ResolveField(() => Proposal)
  public async proposal(@Args() args: GetGovArgs): Promise<Proposal> {
    return this.govService.proposal(args.proposalId, args.height)
  }

  @ResolveField(() => String)
  public async proposer(@Args() args: GetGovArgs): Promise<string> {
    return this.govService.proposer(args.proposalId, args.height)
  }

  @ResolveField(() => [MsgDeposit])
  public async deposits(@Args() args: GetGovArgs): Promise<MsgDeposit[]> {
    return this.govService.deposits(args.proposalId)
  }

  @ResolveField(() => [MsgVote])
  public async votes(@Args() args: GetGovArgs): Promise<MsgVote[]> {
    return this.govService.votes(args.proposalId)
  }

  @ResolveField(() => Tally)
  public async tally(@Args() args: GetGovArgs): Promise<Tally> {
    return this.govService.tally(args.proposalId)
  }

  @ResolveField(() => DepositParams)
  public async depositParameters(@Args() args: GetBaseArgs): Promise<DepositParams> {
    return this.govService.depositParameters(args.height)
  }

  @ResolveField(() => VotingParams)
  public async votingParameters(@Args() args: GetBaseArgs): Promise<VotingParams> {
    return this.govService.votingParameters(args.height)
  }

  @ResolveField(() => TallyParams)
  public async tallyParameters(@Args() args: GetBaseArgs): Promise<TallyParams> {
    return this.govService.tallyParameters(args.height)
  }

  @ResolveField(() => GovParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<GovParams> {
    return this.govService.parameters(args.height)
  }
}
