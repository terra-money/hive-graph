import { ObjectType } from '@nestjs/graphql'
import { AccAddress } from '@terra-money/terra.js'
import { Coin } from 'src/common/models'
import { PublicKeyType } from 'src/common/unions'
import { BaseAccount } from '../interfaces'

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
