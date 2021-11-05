import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { Utils, ValidatorVotingPower } from './models'
import { GetUtilsArgs } from './utils.args'
import { UtilsService } from './utils.service'

@Resolver(Utils)
export class UtilsResolver {
  constructor(private readonly utilsService: UtilsService) {}

  @Query(() => Utils)
  public async utils(): Promise<Utils> {
    return {} as Utils
  }

  @ResolveField(() => Coin)
  public async calculateTax(@Args() args: GetUtilsArgs): Promise<Coin> {
    return this.utilsService.calculateTax(args.coin)
  }

  @ResolveField(() => ValidatorVotingPower)
  public async validatorsWithVotingPower(): Promise<ValidatorVotingPower[]> {
    return this.utilsService.validatorsWithVotingPower()
  }
}
