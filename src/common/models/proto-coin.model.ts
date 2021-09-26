import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProtoCoin {
  @Field()
  denom!: string

  @Field()
  amount!: string
}
