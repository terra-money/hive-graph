import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { Tendermint, DelegateValidator, BlockInfo } from './models'
import { TendermintService } from './tendermint.service'

@Resolver(Tendermint)
export class TendermintResolver {
  constructor(private readonly tendermintService: TendermintService) {}

  @Query(() => Tendermint)
  public async tendermint(): Promise<Tendermint> {
    return {} as Tendermint
  }

  @ResolveField(() => AnythingScalar)
  public async nodeInfo(): Promise<any> {
    return this.tendermintService.nodeInfo()
  }

  @ResolveField(() => Boolean)
  public async syncing(): Promise<boolean> {
    return this.tendermintService.syncing()
  }

  @ResolveField(() => [DelegateValidator])
  public async validatorSet(
    @Args('height', { type: () => Int, nullable: true }) height?: number,
  ): Promise<DelegateValidator[]> {
    return this.tendermintService.validatorSet(height)
  }

  @ResolveField(() => BlockInfo)
  public async blockInfo(@Args('height', { type: () => Int, nullable: true }) height?: number): Promise<BlockInfo> {
    return this.tendermintService.blockInfo(height)
  }
}
