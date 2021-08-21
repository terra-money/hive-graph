import { Field, ObjectType } from '@nestjs/graphql'
import { Authorization as TerraAuthorization, SendAuthorization as TerraSendAuthorization } from 'nestjs-terra'
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
  static fromTerra(authorization: TerraAuthorization): SendAuthorization | GenericAuthorization {
    if (authorization instanceof TerraSendAuthorization) {
      return {
        spend_limit: Coin.fromTerraCoins(authorization.spend_limit),
      }
    }

    return {
      grant_msg_type: authorization.grant_msg_type,
    }
  }
}
