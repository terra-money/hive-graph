import { Field, InterfaceType, Int } from '@nestjs/graphql'
import { AccAddress } from '@terra-money/terra.js'
import { Coin } from 'src/common/models'
import { PublicKeyUnion, PublicKeyType } from '../unions'

@InterfaceType()
export abstract class BaseAccount {
  @Field(() => String)
  address!: AccAddress

  @Field(() => [Coin])
  coins!: Coin[]

  @Field(() => PublicKeyUnion, { nullable: true })
  public_key?: PublicKeyType | null

  @Field(() => Int)
  account_number!: number

  @Field(() => Int)
  sequence!: number
}
