import { ArgsType, Field } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { Coin } from 'src/common/models'

@ArgsType()
export class GetUtilsArgs extends GetBaseArgs {
  @Field(() => Coin)
  coin!: Coin
}
