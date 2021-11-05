import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GetRequiredDenomArgs } from 'src/common/arguments/required.args'
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
  public async taxCap(@Args() args: GetRequiredDenomArgs): Promise<Coin> {
    return this.treasuryService.taxCap(args.denom, args.height)
  }

  @ResolveField(() => String)
  public async taxRate(@Args() args: GetRequiredDenomArgs): Promise<string> {
    return this.treasuryService.taxRate(args.height)
  }

  @ResolveField(() => String)
  public async rewardWeight(@Args() args: GetRequiredDenomArgs): Promise<string> {
    return this.treasuryService.rewardWeight(args.height)
  }

  @ResolveField(() => [Coin])
  public async taxProceeds(@Args() args: GetRequiredDenomArgs): Promise<Coin[]> {
    return this.treasuryService.taxProceeds(args.height)
  }

  @ResolveField(() => Coin)
  public async seigniorageProceeds(@Args() args: GetRequiredDenomArgs): Promise<Coin> {
    return this.treasuryService.seigniorageProceeds(args.height)
  }

  @ResolveField(() => TreasuryParams)
  public async parameters(@Args() args: GetRequiredDenomArgs): Promise<TreasuryParams> {
    return this.treasuryService.parameters(args.height)
  }
}
