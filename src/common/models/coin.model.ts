import { Field, ObjectType, InputType } from '@nestjs/graphql'
import { Coins as TerraCoins, Coin as TerraCoin } from 'src/lcd'

@InputType('CoinInput')
@ObjectType('Coin')
export class Coin {
  @Field()
  denom!: string

  @Field()
  amount!: string

  public static fromTerraCoins(coins: TerraCoins): Coin[] {
    return coins.toArray().map<Coin>(Coin.fromTerraCoin)
  }

  public static fromTerraCoin(coin: TerraCoin): Coin {
    return {
      denom: coin.denom,
      amount: coin.amount.toString(),
    }
  }
}
