import { Field, ArgsType } from '@nestjs/graphql'
import { Denom } from 'src/common/enums'
import { Coin } from 'src/common/models'

@ArgsType()
export class CoinArgs {
  @Field(() => Coin)
  offerCoin!: Coin

  @Field(() => Denom)
  askDenom!: keyof typeof Denom | string
}
