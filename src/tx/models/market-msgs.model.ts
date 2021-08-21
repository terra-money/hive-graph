import { Field, ObjectType } from '@nestjs/graphql'
import { MarketMsg as TerraMarketMsg, MsgSwap as TerraMsgSwap } from 'nestjs-terra'
import { Denom } from 'src/common/enums'
import { Coin } from 'src/common/models'

@ObjectType()
export class MsgSwapSend {
  @Field()
  from_address!: string

  @Field()
  to_address!: string

  @Field(() => Coin)
  offer_coin!: Coin

  @Field(() => Denom)
  ask_denom!: string

  constructor(data: MsgSwapSend) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgSwap {
  @Field()
  trader!: string

  @Field(() => Coin)
  offer_coin!: Coin

  @Field(() => Denom)
  ask_denom!: string

  constructor(data: MsgSwap) {
    Object.assign(this, data)
  }
}

export class MarketMsg {
  static fromTerraMsg(msg: TerraMarketMsg): MsgSwapSend | MsgSwap {
    if (msg instanceof TerraMsgSwap) {
      return new MsgSwap({
        trader: msg.trader,
        offer_coin: Coin.fromTerraCoin(msg.offer_coin),
        ask_denom: msg.ask_denom,
      })
    }

    return new MsgSwapSend({
      from_address: msg.from_address,
      to_address: msg.to_address,
      offer_coin: Coin.fromTerraCoin(msg.offer_coin),
      ask_denom: msg.ask_denom,
    })
  }
}
