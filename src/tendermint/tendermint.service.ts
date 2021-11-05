import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { AnythingScalar } from 'src/anything.scalar'
import { LCDClientError } from 'src/common/errors'
import { BlockInfo, DelegateValidator } from './models'

@Injectable()
export class TendermintService {
  constructor(
    @InjectPinoLogger(TendermintService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async nodeInfo(height?: number): Promise<AnythingScalar> {
    try {
      const data = await this.lcdService.tendermint.nodeInfo({ height })

      return data as any
    } catch (err) {
      this.logger.error({ err }, 'Error getting the node information.')

      throw new LCDClientError(err)
    }
  }

  public async syncing(height?: number): Promise<boolean> {
    try {
      return this.lcdService.tendermint.syncing({ height })
    } catch (err) {
      this.logger.error({ err }, 'Error getting the syncing mode.')

      throw new LCDClientError(err)
    }
  }

  public async validatorSet(height?: number): Promise<DelegateValidator[]> {
    try {
      const [validators] = await this.lcdService.tendermint.validatorSet(height)

      return validators.map((validator) => ({
        address: validator.address,
        pub_key: typeof validator.pub_key.key,
        proposer_priority: validator.proposer_priority,
        voting_power: validator.voting_power,
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting the validator set.')

      throw new LCDClientError(err)
    }
  }

  public async blockInfo(height?: number): Promise<BlockInfo> {
    try {
      const info = await this.lcdService.tendermint.blockInfo(height)

      return {
        block_id: info.block_id,
        block: {
          header: info.block.header,
          data: info.block.data,
          evidence: info.block.evidence,
          last_commit: info.block.last_commit,
        },
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the block information.')

      throw new LCDClientError(err)
    }
  }
}
