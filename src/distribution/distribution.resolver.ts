import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Coin, DistributionParams } from 'src/common/models'
import { DistributionService } from './distribution.service'
import { Distribution, Rewards, ValidatorRewards } from './models'

@Resolver(Distribution)
export class DistributionResolver {
  constructor(private readonly distributionService: DistributionService) {}

  @Query(() => Distribution)
  public async distribution(): Promise<Distribution> {
    return {} as Distribution
  }

  @ResolveField(() => Rewards)
  public async rewards(@Args('delegator') delegator: string): Promise<Rewards> {
    return this.distributionService.rewards(delegator)
  }

  @ResolveField(() => ValidatorRewards)
  public async validatorRewards(@Args('validator') validator: string): Promise<ValidatorRewards> {
    return this.distributionService.validatorRewards(validator)
  }

  @ResolveField(() => String)
  public async withdrawAddress(@Args('delegator') delegator: string): Promise<string> {
    return this.distributionService.withdrawAddress(delegator)
  }

  @ResolveField(() => [Coin])
  public async communityPool(): Promise<Coin[]> {
    return this.distributionService.communityPool()
  }

  @ResolveField(() => DistributionParams)
  public async parameters(): Promise<DistributionParams> {
    return this.distributionService.parameters()
  }
}
