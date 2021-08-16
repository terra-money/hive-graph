import { Field, ObjectType } from '@nestjs/graphql'
import { AuthorizationGrant } from './authorization-grant.model'

@ObjectType()
export class Msgauth {
  @Field(() => [AuthorizationGrant])
  grants!: Promise<AuthorizationGrant[]>
}
