import { Field, ObjectType } from '@nestjs/graphql'
import { Account } from './account.model'

@ObjectType()
export class Auth {
  @Field(() => Account)
  accountInfo!: Promise<Account>
}
