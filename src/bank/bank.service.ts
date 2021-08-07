import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AccAddress, InjectTerraLCDClient, TerraLCDClient } from 'nestjs-terra'
import { Coin } from 'src/common/models'

@Injectable()
export class BankService {
  constructor(
    @InjectPinoLogger(BankService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async balance(address: AccAddress): Promise<Coin[]> {
    try {
      const balance = await this.terraClient.bank.balance(address)

      return balance.toArray().map<Coin>((coin) => ({
        denom: coin.denom,
        amount: coin.amount.toFixed(),
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting balance for %s.', address)

      throw err
    }
  }
}
