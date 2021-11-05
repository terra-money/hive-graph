import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { Coin, MarketParams } from 'src/common/models'
import { GetCoinArgs } from './market.args'
import { MarketService } from './market.service'
import { Market } from './models'

@Resolver(Market)
export class MarketResolver {
  constructor(private readonly marketService: MarketService) {}

  @Query(() => Market)
  public async market(): Promise<Market> {
    return {} as Market
  }

  @ResolveField(() => Coin)
  public async swapRate(@Args() args: GetCoinArgs): Promise<Coin> {
    return this.marketService.swapRate(args.offerCoin, args.askDenom, args.height)
  }

  @ResolveField(() => String)
  public async terraPoolDelta(@Args() args: GetBaseArgs): Promise<string> {
    return this.marketService.terraPoolDelta(args.height)
  }

  @ResolveField(() => MarketParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<MarketParams> {
    return this.marketService.parameters(args.height)
  }
}
