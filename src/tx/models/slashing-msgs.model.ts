import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MsgUnjail {
  @Field()
  address!: string

  constructor(data: MsgUnjail) {
    Object.assign(this, data)
  }
}
