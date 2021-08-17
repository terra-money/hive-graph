import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class Supply {
  @Field(() => [Coin])
  total!: Promise<Coin[]>
}
