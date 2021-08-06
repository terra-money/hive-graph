import { Args, Resolver, Query, ResolveField } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { Account, Auth } from './models/'

@Resolver(Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Auth)
  public async auth(): Promise<Auth> {
    return {} as Auth
  }

  @ResolveField(() => Account)
  public async accountInfo(@Args('address') address: string): Promise<Account> {
    return this.authService.accountInfo(address)
  }
}
