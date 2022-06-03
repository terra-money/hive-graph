import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { IbcParams } from 'src/common/models/index'
import { InjectLCDClient, LCDClient } from 'src/lcd'
import { PaginationOptions, DenomTraces, DenomTrace } from './models/index'

@Injectable()
export class IbcService {
  constructor(
    @InjectPinoLogger(IbcService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async parameters(height?: number): Promise<IbcParams> {
    try {
      const result = await this.lcdService.ibcTransfer.parameters({ height })
      return result
    } catch (err) {
      this.logger.error({ err }, 'Error getting parameters for %s.', height)

      throw new LCDClientError(err)
    }
  }

  public async denomTraces(options: Partial<PaginationOptions>): Promise<DenomTraces> {
    try {
      const traces = await this.lcdService.ibcTransfer.denomTraces(options)

      return {
        denom_traces: traces[0],
        pagination: traces[1],
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting denom traces for %s.', options)

      throw new LCDClientError(err)
    }
  }

  public async denomTrace(hash: string): Promise<DenomTrace> {
    try {
      const trace = await this.lcdService.ibcTransfer.denomTrace(hash)

      return trace
    } catch (err) {
      this.logger.error({ err }, 'Error getting denom trace for %s.', hash)

      throw new LCDClientError(err)
    }
  }
}
