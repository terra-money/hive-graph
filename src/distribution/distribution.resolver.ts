import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { GetRequiredDelegatorArgs } from 'src/common/arguments/required.args'
import { Coin, DistributionParams } from 'src/common/models'
import { DistributionService } from './distribution.service'
import { Distribution, Rewards } from './models'

@Resolver(Distribution)
export class DistributionResolver {
  constructor(private readonly distributionService: DistributionService) {}

  @Query(() => Distribution)
  public async distribution(): Promise<Distribution> {
    return {} as Distribution
  }

  @ResolveField(() => Rewards)
  public async rewards(@Args() args: GetRequiredDelegatorArgs, @Args() basArgs: GetBaseArgs): Promise<Rewards> {
    return this.distributionService.rewards(args.delegator, basArgs.height)
  }

  @ResolveField(() => String)
  public async withdrawAddress(@Args() args: GetRequiredDelegatorArgs, @Args() basArgs: GetBaseArgs): Promise<string> {
    return this.distributionService.withdrawAddress(args.delegator, basArgs.height)
  }

  @ResolveField(() => [Coin])
  public async communityPool(@Args() args: GetBaseArgs): Promise<Coin[]> {
    return this.distributionService.communityPool(args.height)
  }

  @ResolveField(() => DistributionParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<DistributionParams> {
    return this.distributionService.parameters(args.height)
  }
}
