import { ArgsType, Field } from '@nestjs/graphql'
import { Denom } from 'src/common/enums'
import { ValAddress, AccAddress } from 'src/lcd'
import { GetBaseArgs } from './base.args'

@ArgsType()
export class GetRequiredValidatorArgs extends GetBaseArgs {
  @Field(() => String)
  validator!: ValAddress
}

@ArgsType()
export class GetRequiredDenomArgs extends GetBaseArgs {
  @Field(() => String)
  denom!: Denom
}

@ArgsType()
export class GetRequiredDelegatorArgs {
  @Field(() => String)
  delegator!: AccAddress
}
