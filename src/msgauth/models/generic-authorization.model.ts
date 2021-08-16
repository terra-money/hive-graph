import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GenericAuthorization {
  @Field()
  grant_msg_type!: string
}
