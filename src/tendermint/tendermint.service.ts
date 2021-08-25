import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { LcdService } from 'src/lcd/lcd.service'
import { NodeInfo, ValidatorSet, BlockInfo, DelegateValidator } from './models'

@Injectable()
export class TendermintService {
  constructor(
    @InjectPinoLogger(TendermintService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  public async nodeInfo(height?: number): Promise<NodeInfo> {
    try {
      const data = (await this.lcdService.getLCDClient(height).tendermint.nodeInfo()) as any

      return {
        id: data.node_info.id,
        protocol_version: {
          p2p: data.node_info.protocol_version.p2p as string,
          block: data.node_info.protocol_version.block as string,
          app: data.node_info.protocol_version.app as string,
        },
        listen_addr: data.node_info.listen_addr as string,
        network: data.node_info.network as string,
        version: data.node_info.version as string,
        channels: data.node_info.channels as string,
        moniker: data.node_info.moniker as string,
        other: {
          tx_index: data.node_info.other.tx_index as string,
          rpc_address: data.node_info.other.rpc_address as string,
        },
        application_version: {
          name: data.application_version.name as string,
          server_name: data.application_version.server_name as string,
          client_name: data.application_version.client_name as string,
          version: data.application_version.version as string,
          commit: data.application_version.commit as string,
          build_tags: data.application_version.build_tags as string,
          go: data.application_version.go as string,
          build_deps: data.application_version.build_deps as string[],
        },
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the node information.')

      throw new LCDClientError(err)
    }
  }

  public async syncing(height?: number): Promise<boolean> {
    try {
      return this.lcdService.getLCDClient(height).tendermint.syncing()
    } catch (err) {
      this.logger.error({ err }, 'Error getting the syncing mode.')

      throw new LCDClientError(err)
    }
  }

  public async validatorSet(height?: number): Promise<ValidatorSet> {
    try {
      const info = await this.lcdService.getLCDClient(height).tendermint.validatorSet(height)

      return {
        block_height: info.block_height,
        validators: info.validators.map<DelegateValidator>((validator) => ({
          address: validator.address,
          pub_key: typeof validator.pub_key === 'string' ? validator.pub_key : validator.pub_key.value,
          proposer_priority: validator.proposer_priority,
          voting_power: validator.voting_power,
        })),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the validator set.')

      throw new LCDClientError(err)
    }
  }

  public async blockInfo(height?: number): Promise<BlockInfo> {
    try {
      const info = await this.lcdService.getLCDClient(height).tendermint.blockInfo(height)

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
