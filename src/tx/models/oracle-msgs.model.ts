import { Field, ObjectType } from '@nestjs/graphql'
import {
  OracleMsg as TerraOracleMsg,
  MsgExchangeRateVote as TerraMsgExchangeRateVote,
  MsgAggregateExchangeRateVote as TerraMsgAggregateExchangeRateVote,
} from 'nestjs-terra'
import { Denom } from 'src/common/enums'
import { Coin } from 'src/common/models'

@ObjectType()
export class MsgExchangeRateVote {
  @Field()
  exchange_rate!: string

  @Field(() => Denom)
  denom!: string

  @Field()
  salt!: string

  @Field()
  feeder!: string

  @Field()
  validator!: string
}

@ObjectType()
export class MsgExchangeRatePrevote {
  @Field()
  hash!: string

  @Field(() => Denom)
  denom!: string

  @Field()
  feeder!: string

  @Field()
  validator!: string
}

@ObjectType()
export class MsgDelegateFeedConsent {
  @Field()
  operator!: string

  @Field()
  delegate!: string
}

@ObjectType()
export class MsgAggregateExchangeRateVote {
  @Field(() => [Coin])
  exchange_rates!: Coin[]

  @Field()
  salt!: string

  @Field()
  feeder!: string

  @Field()
  validator!: string
}

@ObjectType()
export class MsgAggregateExchangeRatePrevote {
  @Field()
  hash!: string

  @Field()
  feeder!: string

  @Field()
  validator!: string
}

export class OracleMsg {
  static fromTerraMsg(
    msg: TerraOracleMsg,
  ):
    | MsgExchangeRateVote
    | MsgExchangeRatePrevote
    | MsgDelegateFeedConsent
    | MsgAggregateExchangeRateVote
    | MsgAggregateExchangeRatePrevote {
    if (msg instanceof TerraMsgExchangeRateVote) {
      return {
        exchange_rate: msg.exchange_rate.toString(),
        denom: msg.denom,
        salt: msg.salt,
        feeder: msg.feeder,
        validator: msg.validator,
      }
    }

    if (msg instanceof TerraMsgAggregateExchangeRateVote) {
      return {
        exchange_rates: Coin.fromTerraCoins(msg.exchange_rates),
        salt: msg.salt,
        feeder: msg.feeder,
        validator: msg.validator,
      }
    }

    return msg
  }
}
