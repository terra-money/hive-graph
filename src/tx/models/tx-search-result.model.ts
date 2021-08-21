import { ObjectType, Field, Int } from '@nestjs/graphql'
import { TxInfo } from './tx-info.model'

@ObjectType()
export class TxSearchResult {
  @Field(() => Int)
  total_count!: number

  @Field(() => Int)
  count!: number

  @Field(() => Int)
  page_number!: number

  @Field(() => Int)
  page_total!: number

  @Field(() => Int)
  limit!: number

  @Field(() => [TxInfo])
  txs!: TxInfo[]
}
