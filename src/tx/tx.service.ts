import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { StdTx as TerraStdTx, TxInfo as TerraTxInfo } from 'nestjs-terra'
import { StdTx as LegacyTerraStdTx, TxInfo as LegacyTerraTxInfo } from 'nestjs-terra-legacy'
import { LCDClientError } from 'src/common/errors'
import { Coin, PublicKey } from 'src/common/models'
import { LcdService } from 'src/lcd/lcd.service'
// import { CreateTxOptions, StdFee, StdSignMsg, StdTx, TxInfo, TxSearchResult, Msg } from './models'
// import { MsgType } from './unions'
import { StdTx, TxInfo } from './models'

@Injectable()
export class TxService {
  constructor(
    @InjectPinoLogger(TxService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  private fromTerraStdTx(tx: TerraStdTx | LegacyTerraStdTx): StdTx {
    return {
      // fix..
      msg: tx.msg.map((m) => {
        const a = JSON.parse(m.toJSON())

        return {
          type: a.type,
          value: a.value,
        }
      }),
      fee: {
        gas: tx.fee.gas,
        amount: Coin.fromTerraCoins(tx.fee.amount),
      },
      signatures: tx.signatures.map((signature) => {
        return {
          signature: signature.signature,
          pub_key: PublicKey.fromTerraKey(signature.pub_key),
        }
      }),
      memo: tx.memo,
    }
  }

  private fromTerraTxInfo(txInfo: TerraTxInfo | LegacyTerraTxInfo): TxInfo {
    if (!(txInfo.tx instanceof TerraStdTx)) {
      txInfo.tx = TerraStdTx.fromData(txInfo.tx as unknown as TerraStdTx.Data)
    }

    return {
      height: txInfo.height,
      txhash: txInfo.txhash,
      raw_log: txInfo.raw_log,
      logs: (txInfo.logs ?? []).map((log) => ({
        msg_index: log.msg_index ?? null,
        log: log.log ?? null,
        events: log.events ?? [],
      })),
      gas_wanted: txInfo.gas_wanted,
      gas_used: txInfo.gas_used,
      tx: this.fromTerraStdTx(txInfo.tx),
      timestamp: txInfo.timestamp,
      code: txInfo.code,
      codespace: txInfo.codespace,
    }
  }

  public async txInfo(txHash: string, height?: number): Promise<TxInfo> {
    try {
      const tx = await this.lcdService.getLCDClient(height).tx.txInfo(txHash)

      return this.fromTerraTxInfo(tx)
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
  public async txInfosByHeightFromFCD(height: number): Promise<TxInfo[]> {
    const getTxs = (offset: number) =>
      axios.get<{ limit: number; txs: TerraTxInfo[] }>(
        `https://bombay-fcd.terra.dev/v1/txs?block=${height}&offset=${offset}`,
      )

    const fcdResult = await getTxs(0)

    return fcdResult.data.txs.reverse().map((tx) => this.fromTerraTxInfo(tx))
  }

  public async txInfosByHeight(height?: number): Promise<TxInfo[]> {
    try {
      const txs = await this.lcdService.getLCDClient(height).tx.txInfosByHeight(height)

      return txs.map(this.fromTerraTxInfo)
    } catch (err) {
      this.logger.error({ err }, 'Error getting tx infos.')

      throw new LCDClientError(err)
    }
  }

  // public async estimateFee(
  //   sourceAddress: string,
  //   msgs: MsgType[],
  //   options?: {
  //     memo?: string
  //     gas?: string
  //     gasPrices?: Coin[]
  //     gasAdjustment?: string
  //     feeDenoms?: string[]
  //   },
  // ): Promise<StdFee> {
  //   try {
  //     const fee = await this.lcdService.getLCDClient(height).tx.estimateFee(sourceAddress, msgs, options)
  //   } catch (err) {
  //     this.logger.error({ err }, 'Error getting estimate Fee.')

  //     throw new LCDClientError(err)
  //   }
  // }

  // public async encode(tx: StdTx): Promise<string> {}

  // public async hash(tx: StdTx): Promise<string> {}

  // public async broadcast(tx: StdTx): Promise<TxBroadcastResult> {}

  // public async broadcastSync(tx: StdTx): Promise<TxBroadcastResult> {}

  // public async broadcastAsync(tx: StdTx): Promise<TxBroadcastResult> {}

  // public async search(page?: number, limit?: number): Promise<TxSearchResult> {}
}
