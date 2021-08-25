import { Field, ObjectType, InputType } from '@nestjs/graphql'
import { Coins as TerraCoins, Coin as TerraCoin } from 'nestjs-terra'
import { Coins as LegacyTerraCoins, Coin as LegacyTerraCoin } from 'nestjs-terra-legacy'
import { Denom } from '../enums'

export type TerraCoinsType = TerraCoins | LegacyTerraCoins
export type TerraCoinType = TerraCoin | LegacyTerraCoin

@InputType('CoinInput')
@ObjectType('Coin')
export class Coin {
  @Field(() => Denom)
  denom!: string

  @Field()
  amount!: string

  public static fromTerraCoins(coins: TerraCoinsType): Coin[] {
    return coins.toArray().map<Coin>(Coin.fromTerraCoin)
  }

  public static fromTerraCoin(coin: TerraCoinType): Coin {
    return {
      denom: coin.denom,
      amount: coin.amount.toString(),
    }
  }
}
