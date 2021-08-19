import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { AnythingScalar } from 'src/anything.scalar'
import { WasmParams } from 'src/common/models'
import { CodeInfo, ContractInfo, Wasm } from './models'
import { WasmService } from './wasm.service'

@Resolver(Wasm)
export class WasmResolver {
  constructor(private readonly wasmService: WasmService) {}

  @Query(() => Wasm)
  public async wasm(): Promise<Wasm> {
    return {} as Wasm
  }

  @ResolveField(() => CodeInfo)
  public async codeInfo(@Args('codeID', { type: () => Int }) codeID: number): Promise<CodeInfo> {
    return this.wasmService.codeInfo(codeID)
  }

  @ResolveField(() => ContractInfo)
  public async contractInfo(@Args('contractAddress') contractAddress: string): Promise<ContractInfo> {
    return this.wasmService.contractInfo(contractAddress)
  }

  @ResolveField(() => AnythingScalar)
  public async contractQuery(
    @Args('contractAddress') contractAddress: string,
    @Args('query', { type: () => GraphQLJSON }) query: Record<string, any>,
  ): Promise<any> {
    return this.wasmService.contractQuery(contractAddress, query)
  }

  @ResolveField(() => WasmParams)
  public async parameters(): Promise<WasmParams> {
    return this.wasmService.parameters()
  }
}
