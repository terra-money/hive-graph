import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Tx, TxInfo, TxSearchOptions, TxSearchResult } from './models'
import { TxService } from './tx.service'

@Resolver(Tx)
export class TxResolver {
  constructor(private readonly txService: TxService) {}

  @Query(() => Tx)
  public async tx(): Promise<Tx> {
    return {} as Tx
  }

  @ResolveField(() => TxInfo)
  public async txInfo(@Args('txHash') txHash: string): Promise<TxInfo> {
    return this.txService.txInfo(txHash)
  }

  @ResolveField(() => [TxInfo])
  public async byHeight(@Args('height') height: number): Promise<TxInfo[]> {
    return this.txService.txInfosByHeight(height)
  }

  @ResolveField(() => TxSearchResult)
  public async search(@Args('options') options: TxSearchOptions): Promise<TxSearchResult> {
    return this.txService.search(options)
  }
}
