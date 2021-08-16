import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AggregateExchangeRatePrevote {
  @Field()
  hash!: string

  @Field()
  voter!: string

  @Field(() => Int)
  submit_block!: number
}
