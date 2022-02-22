import { Field, ArgsType } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { Coin } from 'src/common/models'

@ArgsType()
export class GetCoinArgs extends GetBaseArgs {
  @Field(() => Coin)
  offerCoin!: Coin

  @Field(() => String)
  askDenom!: string
}
