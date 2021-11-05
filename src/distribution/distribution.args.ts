import { ArgsType, Field } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'

@ArgsType()
export class GetDelegatorArgs extends GetBaseArgs {
  @Field()
  delegator!: string
}

@ArgsType()
export class GetValidatorArgs extends GetBaseArgs {
  @Field()
  validator!: string
}
