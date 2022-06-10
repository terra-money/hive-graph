import { Field, ArgsType } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { Denom } from 'src/common/enums'
import { AccAddress, ValAddress } from 'src/lcd'

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
