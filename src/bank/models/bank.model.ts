import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class Bank {
  @Field(() => [Coin])
  balance!: Promise<Coin[]>

  @Field(() => [Coin])
  total!: Promise<Coin[]>
}
