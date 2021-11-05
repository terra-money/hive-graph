import { Field, ArgsType } from '@nestjs/graphql'
import { ValAddress } from 'nestjs-terra'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { Denom } from 'src/common/enums'

@ArgsType()
export class GetOracleArgs extends GetBaseArgs {
  @Field(() => ValAddress, { nullable: true })
  validator?: ValAddress

  @Field(() => Denom, { nullable: true })
  denom?: Denom
}
