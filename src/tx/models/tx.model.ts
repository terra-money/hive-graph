import { Field, ObjectType } from '@nestjs/graphql'
import { TxInfo } from './tx-info.model'

@ObjectType()
export class Tx {
  @Field(() => TxInfo)
  txInfo!: Promise<TxInfo>
}
