import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { Coin } from 'src/common/models'
import { AccAddress, InjectLCDClient, LCDClient } from 'src/lcd'

@Injectable()
export class BankService {
  constructor(
    @InjectPinoLogger(BankService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async balance(address: AccAddress, height?: number): Promise<Coin[]> {
    try {
      const [balance] = await this.lcdService.bank.balance(address, { height })

      return Coin.fromTerraCoins(balance)
    } catch (err) {
      this.logger.error({ err }, 'Error getting balance for %s.', address)

      throw new LCDClientError(err)
    }
  }

  public async total(height?: number): Promise<Coin[]> {
    try {
      const [total] = await this.lcdService.bank.total({ height })

      return Coin.fromTerraCoins(total)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the total supply of tokens in circulation for all denominations.')

      throw new LCDClientError(err)
    }
  }
}
