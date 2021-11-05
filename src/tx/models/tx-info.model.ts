import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Tx } from '@terra-money/terra.js'
import { ProtoTx } from './proto-tx.model'
import { TxLog } from './tx-log.model'

@ObjectType()
export class TxInfo {
  @Field(() => Int)
  height!: number

  @Field()
  txhash!: string

  @Field({ nullable: true })
  raw_log?: string

  @Field(() => [TxLog], { nullable: true })
  logs?: TxLog[]

  @Field(() => Int)
  gas_wanted!: number

  @Field(() => Int)
  gas_used!: number

  @Field(() => ProtoTx)
  tx!: Tx

  @Field()
  timestamp!: string

  @Field(() => Int, { nullable: true })
  code?: number

  @Field({ nullable: true })
  codespace?: string
}
