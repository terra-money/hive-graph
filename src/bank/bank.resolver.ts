import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { BankService } from './bank.service'
import { Bank } from './models'

@Resolver(Bank)
export class BankResolver {
  constructor(private readonly bankService: BankService) {}

  @Query(() => Bank)
  public async bank(): Promise<Bank> {
    return {} as Bank
  }

  @ResolveField(() => [Coin])
  public async balance(
    @Args('address') address: string,
    @Args('height', { nullable: true }) height: number,
  ): Promise<Coin[]> {
    return this.bankService.balance(address, height)
  }
}
