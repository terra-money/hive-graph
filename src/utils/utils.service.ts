import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { InjectTerraLCDClient, TerraLCDClient, Coin as TerraCoin } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, Validator } from 'src/common/models'
import { ValidatorVotingPower } from './models'

@Injectable()
export class UtilsService {
  constructor(
    @InjectPinoLogger(UtilsService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async calculateTax(coin: Coin): Promise<Coin> {
    const { denom, amount } = coin

    try {
      const tax = await this.terraClient.utils.calculateTax(new TerraCoin(denom, amount))

      return Coin.fromTerraCoin(tax)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the tax that would be applied for the Coin %s%s.', amount, denom)

      throw new LCDClientError(err)
    }
  }

  public async validatorsWithVotingPower(): Promise<ValidatorVotingPower[]> {
    try {
      const data = await this.terraClient.utils.validatorsWithVotingPower()
      const validators = Object.values(data) ?? []

      return validators.map((item) => ({
        validator: Validator.fromTerraValidator(item.validatorInfo),
        voting_power: item.votingPower,
        proposer_priority: item.proposerPriority,
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current validators and merges their voting power.')

      throw new LCDClientError(err)
    }
  }
}
