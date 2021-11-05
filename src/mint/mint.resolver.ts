import { Query, ResolveField, Resolver, Args } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
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
  public async inflation(@Args() args: GetBaseArgs): Promise<string> {
    return this.mintService.inflation(args.height)
  }

  @ResolveField(() => String)
  public async annualProvisions(@Args() args: GetBaseArgs): Promise<string> {
    return this.mintService.annualProvisions(args.height)
  }

  @ResolveField(() => MintingParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<MintingParams> {
    return this.mintService.parameters(args.height)
  }
}
