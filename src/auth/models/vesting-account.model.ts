import { Field, ObjectType, Int } from '@nestjs/graphql'
import { AccAddress } from '@terra-money/terra.js'
import { BaseAccount } from '../interfaces'
import { PublicKeyUnion } from '../unions'
import { Coin } from './coin.model'
import { VestingSchedule } from './vesting-schedule.model'

@ObjectType({
  implements: () => [BaseAccount],
})
export class VestingAccount implements BaseAccount {
  address!: AccAddress

  coins!: Coin[]

  public_key?: typeof PublicKeyUnion | null

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
