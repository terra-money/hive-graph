import { Field, ObjectType } from '@nestjs/graphql'
import { AuthorizationType, AuthorizationUnion } from '../unions/authorization.union'

@ObjectType()
export class AuthorizationGrant {
  @Field(() => AuthorizationUnion)
  authorization!: AuthorizationType

  @Field()
  expiration!: string
}
