import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AuthorizationGrant, Msgauth } from './models'
import { MsgauthService } from './msgauth.service'

@Resolver(Msgauth)
export class MsgauthResolver {
  constructor(private readonly msgauthService: MsgauthService) {}

  @Query(() => Msgauth)
  public async msgauth(): Promise<Msgauth> {
    return {} as Msgauth
  }

  @ResolveField(() => [AuthorizationGrant])
  public async grants(
    @Args('granter') granter: string,
    @Args('grantee') grantee: string,
    @Args('msgType', { nullable: true }) msgType?: string,
  ): Promise<AuthorizationGrant[]> {
    return this.msgauthService.grants(granter, grantee, msgType)
  }
}
