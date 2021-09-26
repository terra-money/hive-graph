import { Field, ObjectType } from '@nestjs/graphql'
import { SignerInfo } from '@terra-money/terra.js'
import { ProtoFee } from './proto-fee.model'
import { ProtoSignerInfos } from './proto-signer-infos.model'

@ObjectType()
export class ProtoAuthInfo {
  @Field(() => ProtoFee)
  fee!: ProtoFee

  @Field(() => [ProtoSignerInfos])
  signer_infos!: SignerInfo[]
}
