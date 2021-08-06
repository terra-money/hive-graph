import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PublicKey {
  @Field()
  type: string

  @Field()
  value: string

  constructor(type: string, value: string) {
    this.type = type
    this.value = value
  }
}
