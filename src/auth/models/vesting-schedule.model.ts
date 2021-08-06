import { Field, ObjectType } from '@nestjs/graphql'
import { ScheduleEntry } from './schedule-entry.model'

@ObjectType()
export class VestingSchedule {
  @Field()
  denom!: string

  @Field(() => [ScheduleEntry])
  schedules!: ScheduleEntry[]
}
