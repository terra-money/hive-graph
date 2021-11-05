import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { TxInfo } from './models'

@Injectable()
export class TxService {
  constructor(
    @InjectPinoLogger(TxService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async txInfo(txHash: string): Promise<TxInfo> {
    try {
      const tx = await this.lcdService.tx.txInfo(txHash)

      return tx
    } catch (err) {
      console.log(err)
      this.logger.error({ err }, 'Error getting tx %s info.', txHash)

      throw new LCDClientError(err)
    }
  }

  // public async txInfosByHeight(height?: number): Promise<TxInfo[]> {}

  // public async search(options: Partial<TxSearchOptions>): Promise<TxSearchResult> {}
}
