import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Coin {
  @Field()
  denom!: string

  @Field()
  amount!: string
}
