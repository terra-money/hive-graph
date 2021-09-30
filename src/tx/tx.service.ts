import { Injectable } from '@nestjs/common'
import { TxInfo, hashAmino } from '@terra-money/terra.js'
import axios from 'axios'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { LcdService } from 'src/lcd/lcd.service'
import { TendermintBlockResponse, TendermintTxResponse } from './types'

@Injectable()
export class TxService {
  constructor(
    @InjectPinoLogger(TxService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  public async txInfo(txHash: string, height?: number): Promise<TxInfo> {
    try {
      const tx = await this.getTx(txHash)

      return TxInfo.fromData(tx.tx_response)
    } catch (err) {
      this.logger.error({ err }, 'Error getting tx %s info.')

      throw new LCDClientError(err)
    }
  }

  // TODO: MUTATION PENDING
  // public async create(sourceAddress: string, options: CreateTxOptions): Promise<StdSignMsg> {
  //   try {
  //     const tx = await this.lcdService.getLCDClient(height).tx.create(sourceAddress, options)
  //   } catch (err) {
  //     this.logger.error({ err, options }, 'Error creating tx %s.', sourceAddress)

  //     throw new LCDClientError(err)
  //   }
  // }

  // temp!
  public async txInfosByHeight(height: number): Promise<TxInfo[]> {
    const config = this.lcdService.getLCDConfig()
    const getBlock = (height: number) =>
      axios
        .get<TendermintBlockResponse>(`${config.URL}/cosmos/base/tendermint/v1beta1/blocks/${height}`)
        .then((r) => r.data)

    const block = await getBlock(height)
    const txs = await Promise.all(
      block.block.data.txs.map((tx) => this.getTx(hashAmino(tx)).then((r) => r.tx_response)),
    )

    return txs.map(TxInfo.fromData)
  }

  private async getTx(txHash: string): Promise<TendermintTxResponse> {
    const config = this.lcdService.getLCDConfig()
    return axios.get<TendermintTxResponse>(`${config.URL}/cosmos/tx/v1beta1/txs/${txHash}`).then((r) => r.data)
  }
}
