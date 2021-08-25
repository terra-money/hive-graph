import { Field, ObjectType } from '@nestjs/graphql'
import { Authorization as TerraAuthorization, SendAuthorization as TerraSendAuthorization } from 'nestjs-terra'
import {
  Authorization as LegacyTerraAuthorization,
  SendAuthorization as LegacyTerraSendAuthorization,
} from 'nestjs-terra-legacy'
import { Coin } from 'src/common/models'

@ObjectType()
export class SendAuthorization {
  @Field(() => [Coin])
  spend_limit!: Coin[]
}

@ObjectType()
export class GenericAuthorization {
  @Field()
  grant_msg_type!: string
}

export class Authorization {
  static fromTerra(
    authorization: TerraAuthorization | LegacyTerraAuthorization,
  ): SendAuthorization | GenericAuthorization {
    if (authorization instanceof TerraSendAuthorization || authorization instanceof LegacyTerraSendAuthorization) {
      return {
        spend_limit: Coin.fromTerraCoins(authorization.spend_limit),
      }
    }

    return {
      grant_msg_type: authorization.grant_msg_type,
    }
  }
}
