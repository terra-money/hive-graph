import { Injectable } from '@nestjs/common'
import { voteOptionFromJSON } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import {
  Coin,
  MsgVote,
  MsgDeposit,
  DepositParams,
  GovParams,
  TallyParams,
  VotingParams,
  ProposalContent,
} from 'src/common/models'
import { InjectLCDClient, LCDClient, Proposal as TerraProposal } from 'src/lcd'
import { Tally, Proposal } from './models'

@Injectable()
export class GovService {
  constructor(
    @InjectPinoLogger(GovService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  private fromTerraProposal(proposal: TerraProposal): Proposal {
    let tally: Tally | undefined

    if (proposal.final_tally_result) {
      tally = new Tally(
        proposal.final_tally_result.yes.toString(),
        proposal.final_tally_result.abstain.toString(),
        proposal.final_tally_result.no.toString(),
        proposal.final_tally_result.no_with_veto.toString(),
      )
    }

    return {
      id: proposal.id,
      content: ProposalContent.fromTerra(proposal.content),
      status: proposal.status,
      final_tally_result: tally,
      submit_time: proposal.submit_time.toISOString(),
      deposit_end_time: proposal.deposit_end_time.toISOString(),
      total_deposit: Coin.fromTerraCoins(proposal.total_deposit),
      voting_start_time: proposal.voting_start_time.toISOString(),
      voting_end_time: proposal.voting_end_time.toISOString(),
    }
  }

  public async proposals(height?: number): Promise<Proposal[]> {
    try {
      const [proposals] = await this.lcdService.gov.proposals({ height })

      return proposals.map<Proposal>((proposal) => this.fromTerraProposal(proposal))
    } catch (err) {
      this.logger.error({ err }, 'Error getting all proposals.')

      throw new LCDClientError(err)
    }
  }

  public async proposal(proposalId: number, height?: number): Promise<Proposal> {
    try {
      const proposal = await this.lcdService.gov.proposal(proposalId, { height })

      return this.fromTerraProposal(proposal)
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async proposer(proposalId: number, height?: number): Promise<string> {
    try {
      return this.lcdService.gov.proposer(proposalId)
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d proposer.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async deposits(proposalId: number, height?: number): Promise<MsgDeposit[]> {
    try {
      const [deposits] = await this.lcdService.gov.deposits(proposalId, { height })

      return deposits.map<MsgDeposit>((deposit) => ({
        proposal_id: deposit.proposal_id,
        depositor: deposit.depositor,
        amount: Coin.fromTerraCoins(deposit.amount),
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d deposits.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async votes(proposalId: number, height?: number): Promise<MsgVote[]> {
    try {
      const [votes] = await this.lcdService.gov.votes(proposalId, { height })

      return votes.map<MsgVote>((vote) => ({
        proposal_id: vote.proposal_id,
        voter: vote.voter,
        options: vote.options.map((item) => ({
          // terra.js should be fixed to return number
          option: typeof item.option === 'string' ? voteOptionFromJSON(item.option) : item.option,
          weight: item.weight.toString(),
        })),
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d votes.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async tally(proposalId: number, height?: number): Promise<Tally> {
    try {
      const tally = await this.lcdService.gov.tally(proposalId, { height })

      return new Tally(
        tally.yes.toString(),
        tally.abstain.toString(),
        tally.no.toString(),
        tally.no_with_veto.toString(),
      )
    } catch (err) {
      this.logger.error({ err }, 'Error getting current tally for proposal %d.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async depositParameters(height?: number): Promise<DepositParams> {
    try {
      const depositParameters = await this.lcdService.gov.depositParameters({ height })

      return {
        min_deposit: Coin.fromTerraCoins(depositParameters.min_deposit),
        max_deposit_period: depositParameters.max_deposit_period,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting deposit parameters.')

      throw new LCDClientError(err)
    }
  }

  public async votingParameters(height?: number): Promise<VotingParams> {
    try {
      const votingParameters = await this.lcdService.gov.votingParameters({ height })

      return {
        voting_period: votingParameters.voting_period,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting voting parameters.')

      throw new LCDClientError(err)
    }
  }

  public async tallyParameters(height?: number): Promise<TallyParams> {
    try {
      const votingParameters = await this.lcdService.gov.tallyParameters({ height })
      const quorum = votingParameters.quorum.toString()
      const threshold = votingParameters.threshold.toString()

      return {
        quorum,
        threshold,
        veto_threshold: votingParameters?.veto_threshold.toString(),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting tally parameters.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<GovParams> {
    try {
      const [deposit_params, voting_params, tally_params] = await Promise.all([
        this.depositParameters(height),
        this.votingParameters(height),
        this.tallyParameters(height),
      ])

      return {
        deposit_params,
        voting_params,
        tally_params,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting Gov parameters.')

      throw new LCDClientError(err)
    }
  }
}
