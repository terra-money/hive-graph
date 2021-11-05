import { Field, ArgsType } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'

@ArgsType()
export class GetMsgauthArgs extends GetBaseArgs {
  @Field(() => String)
  granter!: string

  @Field(() => String)
  grantee!: string

  @Field(() => String, { nullable: true })
  msgType?: string
}
