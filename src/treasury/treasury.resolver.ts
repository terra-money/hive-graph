import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Denom } from 'src/common/enums'
import { Coin, TreasuryParams } from 'src/common/models'
import { Treasury } from './models'
import { TreasuryService } from './treasury.service'

@Resolver(Treasury)
export class TreasuryResolver {
  constructor(private readonly treasuryService: TreasuryService) {}

  @Query(() => Treasury)
  public async treasury(): Promise<Treasury> {
    return {} as Treasury
  }

  @ResolveField(() => Coin)
  public async taxCap(@Args('denom', { type: () => Denom }) denom: Denom): Promise<Coin> {
    return this.treasuryService.taxCap(denom)
  }

  @ResolveField(() => String)
  public async taxRate(@Args('height', { type: () => Int, nullable: true }) height?: number): Promise<string> {
    return this.treasuryService.taxRate(height)
  }

  @ResolveField(() => String)
  public async rewardWeight(): Promise<string> {
    return this.treasuryService.rewardWeight()
  }

  @ResolveField(() => [Coin])
  public async taxProceeds(): Promise<Coin[]> {
    return this.treasuryService.taxProceeds()
  }

  @ResolveField(() => Coin)
  public async seigniorageProceeds(): Promise<Coin> {
    return this.treasuryService.seigniorageProceeds()
  }

  @ResolveField(() => TreasuryParams)
  public async parameters(): Promise<TreasuryParams> {
    return this.treasuryService.parameters()
  }
}
