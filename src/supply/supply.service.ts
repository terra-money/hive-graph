import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { Coin } from 'src/common/models'
import { LcdService } from 'src/lcd/lcd.service'

@Injectable()
export class SupplyService {
  constructor(
    @InjectPinoLogger(SupplyService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  public async total(height?: number): Promise<Coin[]> {
    try {
      const total = await this.lcdService.getLCDClient(height).supply.total()

      return Coin.fromTerraCoins(total)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the total supply of tokens in circulation for all denominations.')

      throw new LCDClientError(err)
    }
  }
}
