import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Proposal as TerraProposal } from 'nestjs-terra'
import { Proposal as LegacyTerraProposal } from 'nestjs-terra-legacy'
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
import { LcdService } from 'src/lcd/lcd.service'
import { Tally, Proposal } from './models'

@Injectable()
export class GovService {
  constructor(
    @InjectPinoLogger(GovService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  private fromTerraProposal(proposal: TerraProposal | LegacyTerraProposal): Proposal {
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

  public async proposals(height?: number): Promise<Proposal[]> {
    try {
      const proposals = await this.lcdService.getLCDClient(height).gov.proposals()

      return proposals.map<Proposal>((proposal) => this.fromTerraProposal(proposal))
    } catch (err) {
      this.logger.error({ err }, 'Error getting all proposals.')

      throw new LCDClientError(err)
    }
  }

  public async proposal(proposalId: number, height?: number): Promise<Proposal> {
    try {
      const proposal = await this.lcdService.getLCDClient(height).gov.proposal(proposalId)

      return this.fromTerraProposal(proposal)
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async proposer(proposalId: number, height?: number): Promise<string> {
    try {
      return this.lcdService.getLCDClient(height).gov.proposer(proposalId)
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d proposer.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async deposits(proposalId: number): Promise<MsgDeposit[]> {
    try {
      // TODO: NEED A FIX IN TERRAJS
      // const deposits = (await this.lcdService.getLCDClient(height).gov.deposits(proposalId)) as TerraMsgDeposit[]

      // return deposits.map<MsgDeposit>((deposit) => ({
      //   proposal_id: deposit.proposal_id,
      //   depositor: deposit.depositor,
      //   amount: Coin.fromTerraCoins(deposit.amount),
      // }))

      return []
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d deposits.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async votes(proposalId: number): Promise<MsgVote[]> {
    try {
      // TODO: NEED A FIX IN TERRAJS
      // const votes = await this.lcdService.getLCDClient(height).gov.votes(proposalId)
      return []
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d votes.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async tally(proposalId: number, height?: number): Promise<Tally> {
    try {
      const tally = await this.lcdService.getLCDClient(height).gov.tally(proposalId)

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

  public async depositParameters(height?: number): Promise<DepositParams> {
    try {
      const depositParameters = await this.lcdService.getLCDClient(height).gov.depositParameters()

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
      const votingParameters = await this.lcdService.getLCDClient(height).gov.votingParameters()

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
      const votingParameters = await this.lcdService.getLCDClient(height).gov.tallyParameters()
      const quorum = votingParameters.quorum.toString()
      const threshold = votingParameters.threshold.toString()

      if ('veto_threshold' in votingParameters) {
        return {
          quorum,
          threshold,
          veto: votingParameters?.veto_threshold.toString(),
        }
      }

      return {
        quorum,
        threshold,
        veto: votingParameters.veto.toString(),
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
