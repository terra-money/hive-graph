import { Field, ObjectType, InputType } from '@nestjs/graphql'
import { Coins as TerraCoins } from 'nestjs-terra'
import { Denom } from '../enums'

@InputType('CoinInput')
@ObjectType('Coin')
export class Coin {
  @Field(() => Denom)
  denom!: string

  @Field()
  amount!: string

  public static fromTerraCoins(coins: TerraCoins): Coin[] {
    return coins.toArray().map<Coin>((coin) => ({
      denom: coin.denom,
      amount: coin.amount.toString(),
    }))
  }
}
