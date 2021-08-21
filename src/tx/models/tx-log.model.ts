import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TxEventKV {
  @Field()
  key!: string

  @Field()
  value!: string
}

@ObjectType()
export class TxEventLog {
  @Field()
  type!: string

  @Field(() => [TxEventKV])
  attributes!: TxEventKV[]
}

@ObjectType()
export class TxLog {
  @Field(() => Int)
  msg_index!: number

  @Field()
  log!: string

  @Field(() => [TxEventLog])
  events!: TxEventLog[]
}
