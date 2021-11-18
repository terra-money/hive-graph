import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class IbcParams {
  @Field()
  send_enabled!: boolean

  @Field()
  receive_enabled!: boolean
}
