import { ArgsType, Field, Int } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'

@ArgsType()
export class GetGovArgs extends GetBaseArgs {
  @Field(() => Int)
  proposalId!: number
}
