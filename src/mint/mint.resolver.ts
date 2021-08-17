import { Query, ResolveField, Resolver } from '@nestjs/graphql'
import { MintingParams } from 'src/common/models'
import { MintService } from './mint.service'
import { Mint } from './models'

@Resolver(Mint)
export class MintResolver {
  constructor(private readonly mintService: MintService) {}

  @Query(() => Mint)
  public async mint(): Promise<Mint> {
    return {} as Mint
  }

  @ResolveField(() => String)
  public async inflation(): Promise<string> {
    return this.mintService.inflation()
  }

  @ResolveField(() => String)
  public async annualProvisions(): Promise<string> {
    return this.mintService.annualProvisions()
  }

  @ResolveField(() => MintingParams)
  public async parameters(): Promise<MintingParams> {
    return this.mintService.parameters()
  }
}
