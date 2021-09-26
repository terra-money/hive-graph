import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TxInfo as ProtoTxInfo } from '@terra-money/terra.js'
import { Tx, TxInfo } from './models'
// import { ProtoTx } from './models/proto-tx.model'
// import { TxInfoAmino } from './models/tx-info.model'
import { TxService } from './tx.service'

@Resolver(Tx)
export class TxResolver {
  constructor(private readonly txService: TxService) {}

  @Query(() => Tx)
  public async tx(): Promise<Tx> {
    return {} as Tx
  }

  @ResolveField(() => [TxInfo])
  public async txInfo(@Args('txHash') txHash: string): Promise<ProtoTxInfo> {
    return this.txService.txInfo(txHash)
  }

  @ResolveField(() => [TxInfo])
  public async byHeight(@Args('height') height: number): Promise<ProtoTxInfo[]> {
    return this.txService.txInfosByHeight(height)
  }

  // @ResolveField(() => )
  // public async txInfo(@Args('txHash') txHash: string): Promise<ProtoTx> {
  //   return this.txService.T
  // }

  // @ResolveField(() => [TxInfo])
  // public async txInfo(@Args('txHash') txHash: string): Promise<TxInfo> {

  // }

  // @ResolveField(() => TxInfoAmino)
  // public async txInfoAmino(@Args('txHash') txHash: string): Promise<TxInfoAmino> {
  //   return this.txService.txInfo(txHash)
  // }

  // @ResolveField(() => [TxInfoAmino])
  // public async byHeightLegacy(@Args('height') height: number): Promise<TxInfoAmino[]> {
  //   return this.txService.txInfosByHeightFromFCD(height)
  // }
}
