import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { InjectLCDClient, LCDClient } from 'src/lcd'
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

  public async txInfosByHeight(height: number): Promise<TxInfo[]> {
    const config = this.lcdService.config

    try {
      return axios.get<TxInfo[]>(`${config.URL}/index/tx/by_height/${height}`).then((r) => r.data)
    } catch (err) {
      const error = `Error getting tx info at height ${height}`
      this.logger.error({ err }, error)

      throw error
    }
  }

  public async search(options: Partial<TxSearchOptions>): Promise<TxSearchResult> {
    try {
      const result = await this.lcdService.tx.search({
        events: options.events,
        'pagination.offset': options.offset?.toString(),
        'pagination.limit': options.limit?.toString(),
      })

      return result
    } catch (err) {
      this.logger.error({ err }, 'Error getting tx %s info.', options)

      throw new LCDClientError(err)
    }
  }
}
