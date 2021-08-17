import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Coin, MarketParams } from 'src/common/models'
import { CoinArgs } from './arguments'
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
  public async swapRate(@Args() args: CoinArgs): Promise<Coin> {
    return this.marketService.swapRate(args.offerCoin, args.askDenom)
  }

  @ResolveField(() => String)
  public async terraPoolDelta(): Promise<string> {
    return this.marketService.terraPoolDelta()
  }

  @ResolveField(() => MarketParams)
  public async parameters(): Promise<MarketParams> {
    return this.marketService.parameters()
  }
}
