import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AccAddress, InjectTerraLCDClient, TerraLCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { WasmParams } from 'src/common/models'
import { CodeInfo, ContractInfo } from './models'

@Injectable()
export class WasmService {
  constructor(
    @InjectPinoLogger(WasmService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async codeInfo(codeID: number): Promise<CodeInfo> {
    try {
      const info = await this.terraClient.wasm.codeInfo(codeID)

      return info
    } catch (err) {
      this.logger.error({ err }, 'Error getting the code %d information.', codeID)

      throw new LCDClientError(err)
    }
  }

  public async contractInfo(contractAddress: AccAddress): Promise<ContractInfo> {
    try {
      const info = await this.terraClient.wasm.contractInfo(contractAddress)

      return info
    } catch (err) {
      this.logger.error({ err }, 'Error getting the contract %s information.', contractAddress)

      throw new LCDClientError(err)
    }
  }

  public async contractQuery(contractAddress: AccAddress, query: Record<string, any>): Promise<any> {
    try {
      const data = await this.terraClient.wasm.contractQuery(contractAddress, query)

      return data
    } catch (err) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)

      throw new LCDClientError(err)
    }
  }

  public async parameters(): Promise<WasmParams> {
    try {
      const parameters = await this.terraClient.wasm.parameters()

      return parameters
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current Wasm parameters.')

      throw new LCDClientError(err)
    }
  }
}
