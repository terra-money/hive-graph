import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Tx, TxInfo } from './models'
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
}
