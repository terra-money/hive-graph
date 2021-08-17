import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import {
  InjectTerraLCDClient,
  TerraLCDClient,
  CommunityPoolSpendProposal,
  TaxRateUpdateProposal,
  RewardWeightUpdateProposal,
  ParameterChangeProposal,
  Proposal as TerraProposal,
  MsgDeposit,
} from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin } from 'src/common/models'
import {
  Tally,
  DepositParams,
  Deposit,
  GovParams,
  Proposal,
  CommunityPoolSpendContent,
  ParameterChangeContent,
  RewardWeightUpdateContent,
  TaxRateUpdateContent,
  TextContent,
  TallyParams,
  VotingParams,
  Vote,
} from './models'

@Injectable()
export class GovService {
  constructor(
    @InjectPinoLogger(GovService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  private fromTerraProposal(proposal: TerraProposal): Proposal {
    const { title, description } = proposal.content ?? {}
    let tally: Tally | undefined
    let content:
      | CommunityPoolSpendContent
      | ParameterChangeContent
      | RewardWeightUpdateContent
      | TaxRateUpdateContent
      | TextContent = new TextContent(title, description)

    if (proposal.final_tally_result) {
      tally = new Tally(
        proposal.final_tally_result.yes.toNumber(),
        proposal.final_tally_result.abstain.toNumber(),
        proposal.final_tally_result.no.toNumber(),
        proposal.final_tally_result.no_with_veto.toNumber(),
      )
    }

    if (proposal.content instanceof CommunityPoolSpendProposal) {
      content = new CommunityPoolSpendContent(title, description, proposal.content.recipient, proposal.content.amount)
    } else if (proposal.content instanceof TaxRateUpdateProposal) {
      content = new TaxRateUpdateContent(title, description, proposal.content.tax_rate.toString())
    } else if (proposal.content instanceof RewardWeightUpdateProposal) {
      content = new RewardWeightUpdateContent(title, description, proposal.content.reward_weight.toString())
    } else if (proposal.content instanceof ParameterChangeProposal) {
      content = new ParameterChangeContent(title, description, proposal.content.changes)
    }

    return {
      id: proposal.id,
      content,
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

  public async deposits(proposalId: number): Promise<Deposit[]> {
    try {
      const deposits = (await this.terraClient.gov.deposits(proposalId)) as MsgDeposit[]

      return deposits.map<Deposit>((deposit) => ({
        proposal_id: deposit.proposal_id,
        depositor: deposit.depositor,
        amount: Coin.fromTerraCoins(deposit.amount),
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting proposal %d deposits.', proposalId)

      throw new LCDClientError(err)
    }
  }

  public async votes(proposalId: number): Promise<Vote[]> {
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
