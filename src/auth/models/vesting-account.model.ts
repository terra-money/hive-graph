import { Field, ObjectType, Int } from '@nestjs/graphql'
import { AccAddress } from '@terra-money/terra.js'
import { Coin } from 'src/common/models'
import { BaseAccount } from '../interfaces'
import { PublicKeyType } from '../unions'
import { VestingSchedule } from './vesting-schedule.model'

@ObjectType({
  implements: () => [BaseAccount],
})
export class VestingAccount implements BaseAccount {
  address!: AccAddress

  coins!: Coin[]

  public_key?: PublicKeyType | null

  account_number!: number

  sequence!: number

  @Field(() => [Coin])
  original_vesting!: Coin[]

  @Field(() => [Coin])
  delegated_free!: Coin[]

  @Field(() => [Coin])
  delegated_vesting!: Coin[]

  @Field(() => Int)
  end_time!: number

  @Field(() => [VestingSchedule])
  vesting_schedules!: VestingSchedule[]
}
