import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ScheduleEntry {
  @Field()
  start_time!: string

  @Field()
  end_time!: string

  @Field()
  ratio!: string
}
