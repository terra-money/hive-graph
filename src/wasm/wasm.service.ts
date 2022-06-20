import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { WasmParams } from 'src/common/models'
import { InjectLCDClient, LCDClient } from 'src/lcd'
import { CodeInfo, ContractInfo } from './models'

@Injectable()
export class WasmService {
  constructor(
    @InjectPinoLogger(WasmService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async codeInfo(codeID: number, height?: number): Promise<CodeInfo> {
    try {
      const info = await this.lcdService.wasm.codeInfo(codeID, { height })

      return {
        code_hash: info.code_hash,
        code_creator: info.creator,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the code %d information.', codeID)

      throw new LCDClientError(err)
    }
  }

  public async contractInfo(contractAddress: string, height?: number): Promise<ContractInfo> {
    try {
      const info = await this.lcdService.wasm.contractInfo(contractAddress, { height })

      return {
        code_id: info.code_id,
        address: info.address,
        owner: info.creator,
        init_msg: info.init_msg,
        admin: info.admin,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the contract %s information.', contractAddress)

      throw new LCDClientError(err)
    }
  }

  public async contractQuery(contractAddress: string, query: Record<string, any>, height?: number): Promise<any> {
    try {
      const data = await this.lcdService.wasm.contractQuery(contractAddress, query, { height })

      return data
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)

      return { error: new LCDClientError(err).toString() }
    }
  }

  public async parameters(height?: number): Promise<WasmParams> {
    try {
      const parameters = await this.lcdService.wasm.parameters({ height })

      return parameters
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current Wasm parameters.')

      throw new LCDClientError(err)
    }
  }
}
