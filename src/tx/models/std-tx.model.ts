import { Field, ObjectType } from '@nestjs/graphql'
import { MsgUnion, MsgType } from '../unions'
import { StdFee } from './std-fee.model'
import { StdSignature } from './std-signature.model'

@ObjectType()
export class StdTx {
  @Field(() => [MsgUnion])
  msg!: MsgType[]

  @Field(() => StdFee)
  fee!: StdFee

  @Field(() => [StdSignature])
  signatures!: StdSignature[]

  @Field(() => String, { defaultValue: '' })
  memo = ''
}
