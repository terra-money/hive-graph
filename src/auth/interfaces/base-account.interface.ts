import { Field, InterfaceType, Int } from '@nestjs/graphql'
import { AccAddress } from '@terra-money/terra.js'
import { Coin } from '../models'
import { PublicKeyUnion } from '../unions'

@InterfaceType()
export abstract class BaseAccount {
  @Field(() => String)
  address!: AccAddress

  @Field(() => [Coin])
  coins!: Coin[]

  @Field(() => PublicKeyUnion, { nullable: true })
  public_key?: typeof PublicKeyUnion | null

  @Field(() => Int)
  account_number!: number

  @Field(() => Int)
  sequence!: number
}
