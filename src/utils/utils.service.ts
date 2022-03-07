import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Coin as TerraCoin, InjectLCDClient, LCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, Validator } from 'src/common/models'
import { ValidatorVotingPower } from './models'

@Injectable()
export class UtilsService {
  constructor(
    @InjectPinoLogger(UtilsService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {
    // add queue
    const queues = new Array(2048).fill(true).map(() => Promise.resolve())
    let distr_i = 0

    const _get = lcdService.apiRequester.get.bind(lcdService.apiRequester)
    const _getRaw = lcdService.apiRequester.getRaw.bind(lcdService.apiRequester)
    lcdService.apiRequester.get = async (a, b) => {
      distr_i = distr_i + (1 % 2048)
      console.log('next', distr_i)

      return queues[distr_i].then(() => _get(a, b))
    }

    lcdService.apiRequester.getRaw = async (a) => {
      distr_i = distr_i + (1 % 2048)
      console.log('next', distr_i)
      return queues[distr_i].then(() => _getRaw(a))
    }
  }

  public async calculateTax(coin: Coin): Promise<Coin> {
    const { denom, amount } = coin

    try {
      const tax = await this.lcdService.utils.calculateTax(new TerraCoin(denom, amount))

      return Coin.fromTerraCoin(tax)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the tax that would be applied for the Coin %s%s.', amount, denom)

      throw new LCDClientError(err)
    }
  }

  public async validatorsWithVotingPower(): Promise<ValidatorVotingPower[]> {
    try {
      const data = await this.lcdService.utils.validatorsWithVotingPower()
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
