import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { GetAddressArgs } from 'src/common/arguments/address.args'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { WasmParams } from 'src/common/models'
import { CodeInfo, ContractInfo, Wasm } from './models'
import { GetWasmCodeIDArgs } from './wasm.args'
import { GetWasmQueryArgs } from './wasm.args'
import { WasmService } from './wasm.service'

@Resolver(Wasm)
export class WasmResolver {
  constructor(private readonly wasmService: WasmService) {}

  @Query(() => Wasm)
  public async wasm(): Promise<Wasm> {
    return {} as Wasm
  }

  @ResolveField(() => CodeInfo)
  public async codeInfo(@Args() args: GetWasmCodeIDArgs): Promise<CodeInfo> {
    return this.wasmService.codeInfo(args.codeID, args.height)
  }

  @ResolveField(() => ContractInfo)
  public async contractInfo(@Args() args: GetAddressArgs): Promise<ContractInfo> {
    return this.wasmService.contractInfo(args.address, args.height)
  }

  @ResolveField(() => AnythingScalar)
  public async contractQuery(@Args() addArgs: GetAddressArgs, @Args() qryArgs: GetWasmQueryArgs): Promise<any> {
    return this.wasmService.contractQuery(addArgs.address, qryArgs.query, addArgs.height)
  }

  @ResolveField(() => WasmParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<WasmParams> {
    return this.wasmService.parameters(args.height)
  }
}
