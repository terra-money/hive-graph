import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TxEventKV {
  @Field({ defaultValue: '' })
  key!: string

  @Field({ defaultValue: '' })
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
  @Field(() => Int, { nullable: true })
  msg_index?: number | null

  @Field(() => String, { nullable: true })
  log?: string | string

  @Field(() => [TxEventLog])
  events: TxEventLog[] = []
}
