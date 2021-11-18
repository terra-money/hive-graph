import { Field, ObjectType } from '@nestjs/graphql'
import { TxInfo } from './tx-info.model'
import { TxSearchResult } from './tx-search-result.model'

@ObjectType()
export class Tx {
  @Field(() => TxInfo)
  txInfo!: Promise<TxInfo>

  @Field(() => [TxInfo])
  byHeight!: Promise<TxInfo[]>

  @Field(() => TxSearchResult)
  search!: Promise<TxSearchResult>
}
