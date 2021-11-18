import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { TxInfo, TxSearchOptions, TxSearchResult } from './models'

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
      this.logger.error({ err }, 'Error getting tx %s info.', txHash)

      throw new LCDClientError(err)
    }
  }

  public async txInfosByHeight(height?: number): Promise<TxInfo[]> {
    try {
      const txs = await this.lcdService.tx.txInfosByHeight(height)

      return txs
    } catch (err) {
      this.logger.error({ err }, 'Error getting tx %s by height info.', height)

      throw new LCDClientError(err)
    }
  }

  public async search(options: Partial<TxSearchOptions>): Promise<TxSearchResult> {
    try {
      const result = await this.lcdService.tx.search(options)

      return result
    } catch (err) {
      this.logger.error({ err }, 'Error getting tx %s info.', options)

      throw new LCDClientError(err)
    }
  }
}
