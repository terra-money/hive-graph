import { ObjectType } from '@nestjs/graphql'
import { AccAddress } from '@terra-money/terra.js'
import { BaseAccount } from '../interfaces'
import { PublicKeyUnion } from '../unions'
import { Coin } from './coin.model'

@ObjectType({
  implements: () => [BaseAccount],
})
export class Account implements BaseAccount {
  address!: AccAddress

  coins!: Coin[]

  public_key?: typeof PublicKeyUnion | null

  account_number!: number

  sequence!: number
}
