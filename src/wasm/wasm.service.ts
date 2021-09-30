import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { WasmParams } from 'src/common/models'
import { LcdService } from 'src/lcd/lcd.service'
import { CodeInfo, ContractInfo } from './models'

@Injectable()
export class WasmService {
  constructor(
    @InjectPinoLogger(WasmService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  public async codeInfo(codeID: number, height?: number): Promise<CodeInfo> {
    try {
      const info = await this.lcdService.getLCDClient(height).wasm.codeInfo(codeID)

      return {
        code_hash: info.code_hash,
        code_creator: 'code_creator' in info ? info.code_creator : info.creator,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the code %d information.', codeID)

      throw new LCDClientError(err)
    }
  }

  public async contractInfo(contractAddress: string, height?: number): Promise<ContractInfo> {
    try {
      const info = await this.lcdService.getLCDClient(height).wasm.contractInfo(contractAddress)

      return {
        code_id: info.code_id,
        address: info.address,
        owner: 'owner' in info ? info.owner : info.creator,
        init_msg: info.init_msg,
        admin: 'admin' in info ? info.admin : null,
        migratable: 'migratable' in info ? info.migratable : null,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the contract %s information.', contractAddress)

      throw new LCDClientError(err)
    }
  }

  public async contractQuery(contractAddress: string, query: Record<string, any>, height?: number): Promise<any> {
    try {
      const data = await this.lcdService.getLCDClient(height).wasm.contractQuery(contractAddress, query, { height })

      return data
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<WasmParams> {
    try {
      const parameters = await this.lcdService.getLCDClient(height).wasm.parameters()

      return parameters
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current Wasm parameters.')

      throw new LCDClientError(err)
    }
  }
}
