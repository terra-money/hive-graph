import { Field, ObjectType } from '@nestjs/graphql'
import {
  MsgAuthMsg as TerraMsgAuthMsg,
  MsgGrantAuthorization as TerraMsgGrantAuthorization,
  MsgRevokeAuthorization as TerraMsgRevokeAuthorization,
} from 'nestjs-terra'
import {
  MsgAuthMsg as LegacyTerraMsgAuthMsg,
  MsgGrantAuthorization as LegacyMsgGrantAuthorization,
  MsgRevokeAuthorization as LegacyMsgRevokeAuthorization,
} from 'nestjs-terra-legacy'
import { Authorization } from 'src/common/models'
import { AuthorizationUnion, AuthorizationType } from 'src/common/unions'
import { MsgUnion, MsgType } from '../unions'
import { Msg } from './msg.model'

@ObjectType()
export class MsgGrantAuthorization {
  @Field()
  granter!: string

  @Field()
  grantee!: string

  @Field(() => AuthorizationUnion)
  authorization!: AuthorizationType

  @Field()
  expiration!: string

  constructor(data: MsgGrantAuthorization) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgRevokeAuthorization {
  @Field()
  granter!: string

  @Field()
  grantee!: string

  @Field()
  authorization_msg_type!: string

  constructor(data: MsgRevokeAuthorization) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgExecAuthorized {
  @Field()
  grantee!: string

  @Field(() => [MsgUnion])
  msgs!: MsgType[]

  constructor(data: MsgExecAuthorized) {
    Object.assign(this, data)
  }
}

export class MsgAuthMsg {
  static fromTerraMsg(
    msg: TerraMsgAuthMsg | LegacyTerraMsgAuthMsg,
  ): MsgGrantAuthorization | MsgRevokeAuthorization | MsgExecAuthorized {
    if (msg instanceof TerraMsgGrantAuthorization || msg instanceof LegacyMsgGrantAuthorization) {
      return new MsgGrantAuthorization({
        granter: msg.granter,
        grantee: msg.grantee,
        authorization: Authorization.fromTerra(msg.authorization),
        expiration: msg instanceof TerraMsgGrantAuthorization ? msg.expiration.toISOString() : msg.period.toString(),
      })
    }

    if (msg instanceof TerraMsgRevokeAuthorization || msg instanceof LegacyMsgRevokeAuthorization) {
      return new MsgRevokeAuthorization({
        granter: msg.granter,
        grantee: msg.grantee,
        authorization_msg_type:
          msg instanceof TerraMsgRevokeAuthorization ? msg.msg_type_url : msg.authorization_msg_type,
      })
    }

    return new MsgExecAuthorized({
      grantee: msg.grantee,
      msgs: Msg.fromTerraMsgs(msg.msgs),
    })
  }
}
