import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import {
  InjectTerraLCDClient,
  TerraLCDClient,
  Proposal as TerraProposal,
  MsgDeposit as TerraMsgDeposit,
} from 'nestjs-terra'
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
import { Tally, Proposal } from './models'

@Injectable()
export class GovService {
  constructor(
    @InjectPinoLogger(GovService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  private fromTerraProposal(proposal: TerraProposal): Proposal {
    let tally: Tally | undefined

    if (proposal.final_tally_result) {
      tally = new Tally(
        proposal.final_tally_result.yes.toNumber(),
        proposal.final_tally_result.abstain.toNumber(),
        proposal.final_tally_result.no.toNumber(),
        proposal.final_tally_result.no_with_veto.toNumber(),
      )
    }

    return {
      id: proposal.id,
      content: ProposalContent.fromTerra(proposal.content),
      proposal_status: proposal.proposal_status,
      final_tally_result: tally,
      submit_time: proposal.submit_time.toISOString(),
      deposit_end_time: proposal.deposit_end_time.toISOString(),
      total_deposit: Coin.fromTerraCoins(proposal.total_deposit),
      voting_start_time: proposal.voting_start_time.toISOString(),
      voting_end_time: proposal.voting_end_time.toISOString(),
    }
  }

  public async proposals(): Promise<Proposal[]> {
    try {
      const proposals = await this.terraClient.gov.proposals()

      return proposals.map<Proposal>((proposal) => this.fromTerraProposal(proposal))
    } catch (err) {
      this.logger.error({ err }, 'Error getting all proposals.')

      throw new LCDClientError(err)
    }
  }

  public async proposal(proposalId: number): Promise<Proposal> {
    try {
      const proposal = await this.terraClient.gov.proposal(proposalId)

      return this.fromTerraProposal(proposal)
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async proposer(proposalId: number): Promise<string> {
    try {
      return this.terraClient.gov.proposer(proposalId)
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d proposer.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async deposits(proposalId: number): Promise<MsgDeposit[]> {
    try {
      const deposits = (await this.terraClient.gov.deposits(proposalId)) as TerraMsgDeposit[]

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

  public async votes(proposalId: number): Promise<MsgVote[]> {
    try {
      // TODO: PENDING FOR FIX IN TERRA.JS
      return []
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d votes.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async tally(proposalId: number): Promise<Tally> {
    try {
      const tally = await this.terraClient.gov.tally(proposalId)

      return new Tally(
        tally.yes.toNumber(),
        tally.abstain.toNumber(),
        tally.no.toNumber(),
        tally.no_with_veto.toNumber(),
      )
    } catch (err) {
      this.logger.error({ err }, 'Error getting current tally for proposal %d.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async depositParameters(): Promise<DepositParams> {
    try {
      const depositParameters = await this.terraClient.gov.depositParameters()

      return {
        min_deposit: Coin.fromTerraCoins(depositParameters.min_deposit),
        max_deposit_period: depositParameters.max_deposit_period,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting deposit parameters.')

      throw new LCDClientError(err)
    }
  }

  public async votingParameters(): Promise<VotingParams> {
    try {
      const votingParameters = await this.terraClient.gov.votingParameters()

      return {
        voting_period: votingParameters.voting_period,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting voting parameters.')

      throw new LCDClientError(err)
    }
  }

  public async tallyParameters(): Promise<TallyParams> {
    try {
      const votingParameters = await this.terraClient.gov.tallyParameters()

      return {
        quorum: votingParameters.quorum.toString(),
        threshold: votingParameters.threshold.toString(),
        veto: votingParameters.veto.toString(),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting tally parameters.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(): Promise<GovParams> {
    try {
      const [deposit_params, voting_params, tally_params] = await Promise.all([
        this.depositParameters(),
        this.votingParameters(),
        this.tallyParameters(),
      ])

      return {
        deposit_params,
        voting_params,
        tally_params,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting parameters.')

      throw new LCDClientError(err)
    }
  }
}
