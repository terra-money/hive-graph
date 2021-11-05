import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AuthorizationGrant, Msgauth } from './models'
import { GetMsgauthArgs } from './msgauth.args'
import { MsgauthService } from './msgauth.service'

@Resolver(Msgauth)
export class MsgauthResolver {
  constructor(private readonly msgauthService: MsgauthService) {}

  @Query(() => Msgauth)
  public async msgauth(): Promise<Msgauth> {
    return {} as Msgauth
  }

  @ResolveField(() => [AuthorizationGrant])
  public async grants(@Args() args: GetMsgauthArgs): Promise<AuthorizationGrant[]> {
    return this.msgauthService.grants(args.granter, args.grantee, args.msgType, args.height)
  }
}
