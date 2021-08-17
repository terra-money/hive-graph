import { Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { Supply } from './models'
import { SupplyService } from './supply.service'

@Resolver(Supply)
export class SupplyResolver {
  constructor(private readonly supplyService: SupplyService) {}

  @Query(() => Supply)
  public async supply(): Promise<Supply> {
    return {} as Supply
  }

  @ResolveField(() => [Coin])
  public async total(): Promise<Coin[]> {
    return this.supplyService.total()
  }
}
