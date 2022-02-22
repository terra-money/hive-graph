import { Field, ArgsType } from '@nestjs/graphql'
import { AccAddress, ValAddress } from 'nestjs-terra'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { Denom } from 'src/common/enums'

@ArgsType()
export class GetOptionalValidatorArgs extends GetBaseArgs {
  @Field(() => String, { nullable: true })
  validator?: ValAddress
}
@ArgsType()
export class GetOptionalDenomArgs extends GetBaseArgs {
  @Field(() => String, { nullable: true })
  denom?: Denom
}
@ArgsType()
export class GetOptionalDelegatorArgs extends GetBaseArgs {
  @Field(() => String, { nullable: true })
  delegator?: AccAddress
}
