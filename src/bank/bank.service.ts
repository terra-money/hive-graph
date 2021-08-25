import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AccAddress } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin } from 'src/common/models'
import { LcdService } from 'src/lcd/lcd.service'

@Injectable()
export class BankService {
  constructor(
    @InjectPinoLogger(BankService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  public async balance(address: AccAddress, height?: number): Promise<Coin[]> {
    try {
      const balance = await this.lcdService.getLCDClient(height).bank.balance(address)

      return Coin.fromTerraCoins(balance)
    } catch (err) {
      this.logger.error({ err }, 'Error getting balance for %s.', address)

      throw new LCDClientError(err)
    }
  }
}
