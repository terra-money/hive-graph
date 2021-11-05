import { Field, ObjectType } from '@nestjs/graphql'
import {
  Authorization as TerraAuthorization,
  SendAuthorization as TerraSendAuthorization,
  GenericAuthorization as TerraGenericAuthorization,
} from 'nestjs-terra'
import { Coin } from 'src/common/models'

@ObjectType()
export class SendAuthorization {
  @Field(() => [Coin])
  spend_limit!: Coin[]
}

@ObjectType()
export class GenericAuthorization {
  @Field()
  msg!: string
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
}

export class Authorization {
  static fromTerra(authorization: TerraAuthorization): SendAuthorization | GenericAuthorization | StakeAuthorization {
    if (authorization instanceof TerraSendAuthorization) {
      return {
        spend_limit: Coin.fromTerraCoins(authorization.spend_limit),
      }
    }

    if (authorization instanceof TerraGenericAuthorization) {
      return {
        msg: authorization.msg,
      }
    }

    return {
      max_tokens: authorization.max_tokens ? Coin.fromTerraCoin(authorization.max_tokens) : undefined,
      allow_list: { addresses: authorization?.allow_list?.address ?? [] },
      deny_list: { addresses: authorization?.deny_list?.address ?? [] },
      authorization_type: authorization?.authorization_type,
    }
  }
}
