import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { SlashingParams } from 'src/common/models'
import { Slashing, SigningInfo } from './models'
import { SlashingService } from './slashing.service'

@Resolver(Slashing)
export class SlashingResolver {
  constructor(private readonly slashingService: SlashingService) {}

  @Query(() => Slashing)
  public async slashing(): Promise<Slashing> {
    return {} as Slashing
  }

  @ResolveField(() => [SigningInfo])
  public async signingInfos(@Args('valConsPubKey', { nullable: true }) valConsPubKey?: string): Promise<SigningInfo[]> {
    return this.slashingService.signingInfos(valConsPubKey)
  }

  @ResolveField(() => SlashingParams)
  public async parameters(): Promise<SlashingParams> {
    return this.slashingService.parameters()
  }
}
