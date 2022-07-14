import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import {
  Authorization as TerraAuthorization,
  SendAuthorization as TerraSendAuthorization,
  GenericAuthorization as TerraGenericAuthorization,
} from 'src/lcd'

@ObjectType()
export class SendAuthorization {
  @Field(() => [Coin])
  spend_limit!: Coin[]

  constructor(spend_limit: Coin[]) {
    this.spend_limit = spend_limit
  }
}

@ObjectType()
export class GenericAuthorization {
  @Field()
  msg!: string

  constructor(msg: string) {
    this.msg = msg
  }
}

@ObjectType()
export class StakeAuthorizationValidators {
  @Field(() => [String])
  addresses!: string[]
}

@ObjectType()
export class StakeAuthorization {
  @Field(() => Coin, { nullable: true })
  max_tokens?: Coin

  @Field(() => StakeAuthorizationValidators, { nullable: true })
  allow_list?: StakeAuthorizationValidators

  @Field(() => StakeAuthorizationValidators, { nullable: true })
  deny_list?: StakeAuthorizationValidators

  @Field()
  authorization_type!: number

  constructor(
    authorization_type: number,
    max_tokens?: Coin,
    allow_list?: StakeAuthorizationValidators,
    deny_list?: StakeAuthorizationValidators,
  ) {
    this.authorization_type = authorization_type
    this.max_tokens = max_tokens
    this.allow_list = allow_list
    this.deny_list = deny_list
  }
}

export class Authorization {
  static fromTerra(authorization: TerraAuthorization): SendAuthorization | GenericAuthorization | StakeAuthorization {
    if (authorization instanceof TerraSendAuthorization) {
      return new SendAuthorization(Coin.fromTerraCoins(authorization.spend_limit))
    }

    if (authorization instanceof TerraGenericAuthorization) {
      return new GenericAuthorization(authorization.msg)
    }

    return new StakeAuthorization(
      authorization.authorization_type,
      authorization.max_tokens ? Coin.fromTerraCoin(authorization.max_tokens) : undefined,
      { addresses: authorization?.allow_list?.address ?? [] },
      { addresses: authorization?.deny_list?.address ?? [] },
    )
  }
}
