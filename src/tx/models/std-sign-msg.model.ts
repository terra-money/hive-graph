import { Field, Int, ObjectType } from '@nestjs/graphql'
import { MsgUnion, MsgType } from '../unions'
import { StdFee } from './std-fee.model'

@ObjectType()
export class StdSignMsg {
  @Field()
  chain_id!: string

  @Field(() => Int)
  account_number!: number

  @Field(() => Int)
  sequence!: number

  @Field(() => StdFee)
  fee!: StdFee

  @Field(() => [MsgUnion])
  msgs!: MsgType[]

  @Field(() => String, { defaultValue: '' })
  memo!: ''
}
