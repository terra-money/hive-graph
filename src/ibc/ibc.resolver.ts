import { Resolver, Query, ResolveField, Args } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { IbcParams } from 'src/common/models/index'
import { GetIbcArgs } from './ibc.args'
import { IbcService } from './ibc.service'
import { Ibc, PaginationOptions, DenomTraces, DenomTrace } from './models/index'
@Resolver(Ibc)
export class IbcResolver {
  constructor(private readonly ibcService: IbcService) {}

  @Query(() => Ibc)
  public async ibc(): Promise<Ibc> {
    return {} as Ibc
  }

  @ResolveField(() => IbcParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<IbcParams> {
    return await this.ibcService.parameters(args.height)
  }

  @ResolveField(() => DenomTraces)
  public async denomTraces(@Args('options') options: PaginationOptions): Promise<DenomTraces> {
    return await this.ibcService.denomTraces(options)
  }

  @ResolveField(() => DenomTrace)
  public async denomTrace(@Args() args: GetIbcArgs): Promise<DenomTrace> {
    return await this.ibcService.denomTrace(args.hash)
  }
}
