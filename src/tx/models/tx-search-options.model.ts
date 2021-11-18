import { Field, Int, InputType } from '@nestjs/graphql'

@InputType()
export class TxSearchOptions {
  @Field(() => Int)
  limit!: number

  @Field(() => Int)
  page!: number

  @Field(() => [Event])
  events!: Event[]
}

@InputType()
class Event {
  @Field()
  key!: string

  @Field()
  value!: string
}
