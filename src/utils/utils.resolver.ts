import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { Utils, ValidatorVotingPower } from './models'
import { UtilsService } from './utils.service'

@Resolver(Utils)
export class UtilsResolver {
  constructor(private readonly utilsService: UtilsService) {}

  @Query(() => Utils)
  public async utils(): Promise<Utils> {
    return {} as Utils
  }

  @ResolveField(() => Coin)
  public async calculateTax(@Args('coin', { type: () => Coin }) coin: Coin): Promise<Coin> {
    return this.utilsService.calculateTax(coin)
  }

  @ResolveField(() => ValidatorVotingPower)
  public async validatorsWithVotingPower(): Promise<ValidatorVotingPower[]> {
    return this.utilsService.validatorsWithVotingPower()
  }
}
