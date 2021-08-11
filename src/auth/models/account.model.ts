import { ObjectType } from '@nestjs/graphql'
import { AccAddress } from '@terra-money/terra.js'
import { Coin } from 'src/common/models'
import { BaseAccount } from '../interfaces'
import { PublicKeyType } from '../unions'

@ObjectType({
  implements: () => [BaseAccount],
})
export class Account implements BaseAccount {
  address!: AccAddress

  coins!: Coin[]

  public_key?: PublicKeyType | null

  account_number!: number

  sequence!: number
}
