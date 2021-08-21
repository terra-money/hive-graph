import { Field, ObjectType } from '@nestjs/graphql'
import { AuthorizationType, AuthorizationUnion } from 'src/common/unions'

@ObjectType()
export class AuthorizationGrant {
  @Field(() => AuthorizationUnion)
  authorization!: AuthorizationType

  @Field()
  expiration!: string
}
