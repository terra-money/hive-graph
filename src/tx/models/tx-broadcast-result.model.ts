import { ObjectType, Field, Int } from '@nestjs/graphql'
import { TxLog } from './tx-log.model'

@ObjectType()
export class TxBroadcastResult {
  @Field()
  height!: string

  @Field()
  txhash!: string

  @Field({ nullable: true })
  raw_log?: string

  @Field({ nullable: true })
  gas_wanted?: string

  @Field({ nullable: true })
  gas_used?: string

  @Field(() => [TxLog], { nullable: true })
  logs?: TxLog[]

  @Field(() => Int, { nullable: true })
  code?: number

  @Field({ nullable: true })
  codespace?: string
}
