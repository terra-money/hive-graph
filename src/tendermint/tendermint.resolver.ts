import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Tendermint, NodeInfo, ValidatorSet, BlockInfo } from './models'
import { TendermintService } from './tendermint.service'

@Resolver(Tendermint)
export class TendermintResolver {
  constructor(private readonly tendermintService: TendermintService) {}

  @Query(() => Tendermint)
  public async tendermint(): Promise<Tendermint> {
    return {} as Tendermint
  }

  @ResolveField(() => NodeInfo)
  public async nodeInfo(): Promise<NodeInfo> {
    return this.tendermintService.nodeInfo()
  }

  @ResolveField(() => Boolean)
  public async syncing(): Promise<boolean> {
    return this.tendermintService.syncing()
  }

  @ResolveField(() => ValidatorSet)
  public async validatorSet(
    @Args('height', { type: () => Int, nullable: true }) height?: number,
  ): Promise<ValidatorSet> {
    return this.tendermintService.validatorSet(height)
  }

  @ResolveField(() => BlockInfo)
  public async blockInfo(@Args('height', { type: () => Int, nullable: true }) height?: number): Promise<BlockInfo> {
    return this.tendermintService.blockInfo(height)
  }
}
