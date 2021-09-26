import { Field, ObjectType } from '@nestjs/graphql'
import { AuthInfo, TxBody } from '@terra-money/terra.js'
import { ProtoAuthInfo } from './proto-auth-info.model'
import { ProtoTxBody } from './proto-tx-body.model'

@ObjectType()
export class ProtoTx {
  @Field(() => ProtoTxBody)
  body!: TxBody

  @Field(() => ProtoAuthInfo)
  auth_info!: AuthInfo

  @Field(() => [String])
  signatures!: string[]
}
