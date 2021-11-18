import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GetAddressArgs } from 'src/common/arguments/address.args'
import { GetBaseArgs } from 'src/common/arguments/base.args'
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
  public async balance(@Args() args: GetAddressArgs): Promise<Coin[]> {
    return this.bankService.balance(args.address, args.height)
  }

  @ResolveField(() => [Coin])
  public async total(@Args() args: GetBaseArgs): Promise<Coin[]> {
    return this.bankService.total(args.height)
  }
}
