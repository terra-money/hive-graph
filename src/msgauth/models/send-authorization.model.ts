import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class SendAuthorization {
  @Field(() => [Coin])
  spend_limit!: Coin[]
}
