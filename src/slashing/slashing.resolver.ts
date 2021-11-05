import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
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
  public async signingInfos(@Args() args: GetBaseArgs): Promise<SigningInfo[]> {
    return this.slashingService.signingInfos(args.height)
  }

  @ResolveField(() => SlashingParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<SlashingParams> {
    return this.slashingService.parameters(args.height)
  }
}
