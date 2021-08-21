import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class StdFee {
  @Field()
  gas!: number

  @Field(() => [Coin])
  amount!: Coin[]
}
