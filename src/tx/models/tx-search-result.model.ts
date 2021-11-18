import { ObjectType, Field } from '@nestjs/graphql'
import { Pagination } from 'src/common/models/index'
import { TxInfo } from './tx-info.model'
@ObjectType()
export class TxSearchResult {
  @Field(() => Pagination)
  pagination!: Pagination

  @Field(() => [TxInfo])
  txs!: TxInfo[]
}
