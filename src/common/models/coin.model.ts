import { Field, ObjectType } from '@nestjs/graphql'
import { Coins as TerraCoins } from 'nestjs-terra'

@ObjectType()
export class Coin {
  @Field()
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
