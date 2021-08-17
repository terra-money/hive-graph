import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class Delegation {
  @Field()
  delegator_address!: string

  @Field()
  validator_address!: string

  @Field()
  shares!: string

  @Field(() => Coin)
  balance!: Coin
}
