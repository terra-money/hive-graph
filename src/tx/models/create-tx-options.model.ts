import { InputType, Field, Int } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { MsgType, MsgUnion } from '../unions'
import { StdFee } from './std-fee.model'

@InputType()
export class CreateTxOptions {
  @Field(() => [MsgUnion])
  msgs!: MsgType[]

  @Field(() => StdFee, { nullable: true })
  fee?: StdFee

  @Field({ nullable: true })
  memo?: string

  @Field({ nullable: true })
  gas?: string

  @Field(() => [Coin], { nullable: true })
  gasPrices?: Coin[]

  @Field({ nullable: true })
  gasAdjustment?: string

  @Field(() => [String], { nullable: true })
  feeDenoms?: string[]

  @Field(() => Int, { nullable: true })
  account_number?: number

  @Field(() => Int, { nullable: true })
  sequence?: number
}
