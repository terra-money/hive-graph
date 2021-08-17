import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectTerraLCDClient, TerraLCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin } from 'src/common/models'

@Injectable()
export class SupplyService {
  constructor(
    @InjectPinoLogger(SupplyService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async total(): Promise<Coin[]> {
    try {
      const total = await this.terraClient.supply.total()

      return Coin.fromTerraCoins(total)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the total supply of tokens in circulation for all denominations.')

      throw new LCDClientError(err)
    }
  }
}
