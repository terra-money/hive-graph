import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { PublicKeyType, PublicKeyUnion } from 'src/common/unions'
import { AccAddress } from 'src/lcd'
import { VestingSchedule } from './vesting-schedule.model'

@ObjectType()
export class LazyGradedVestingAccount {
  @Field()
  @Field(() => String)
  address!: AccAddress

  @Field(() => PublicKeyUnion, { nullable: true })
  public_key?: PublicKeyType | null

  @Field(() => Int)
  account_number!: number

  @Field(() => Int)
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
