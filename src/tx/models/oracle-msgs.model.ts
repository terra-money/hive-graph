import { Field, ObjectType } from '@nestjs/graphql'
import {
  OracleMsg as TerraOracleMsg,
  MsgExchangeRatePrevote as TerraMsgExchangeRatePrevote,
  MsgDelegateFeedConsent as TerraMsgDelegateFeedConsent,
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

  constructor(data: MsgExchangeRateVote) {
    Object.assign(this, data)
  }
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

  constructor(data: MsgExchangeRatePrevote) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgDelegateFeedConsent {
  @Field()
  operator!: string

  @Field()
  delegate!: string

  constructor(data: MsgDelegateFeedConsent) {
    Object.assign(this, data)
  }
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

  constructor(data: MsgAggregateExchangeRateVote) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgAggregateExchangeRatePrevote {
  @Field()
  hash!: string

  @Field()
  feeder!: string

  @Field()
  validator!: string

  constructor(data: MsgAggregateExchangeRatePrevote) {
    Object.assign(this, data)
  }
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
      return new MsgExchangeRateVote({
        exchange_rate: msg.exchange_rate.toString(),
        denom: msg.denom,
        salt: msg.salt,
        feeder: msg.feeder,
        validator: msg.validator,
      })
    }

    if (msg instanceof TerraMsgExchangeRatePrevote) {
      return new MsgExchangeRatePrevote({
        hash: msg.hash,
        denom: msg.denom,
        feeder: msg.feeder,
        validator: msg.validator,
      })
    }

    if (msg instanceof TerraMsgDelegateFeedConsent) {
      return new MsgDelegateFeedConsent({
        operator: msg.operator,
        delegate: msg.delegate,
      })
    }

    if (msg instanceof TerraMsgAggregateExchangeRateVote) {
      return new MsgAggregateExchangeRateVote({
        exchange_rates: Coin.fromTerraCoins(msg.exchange_rates),
        salt: msg.salt,
        feeder: msg.feeder,
        validator: msg.validator,
      })
    }

    return new MsgAggregateExchangeRatePrevote(msg)
  }
}
