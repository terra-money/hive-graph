import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SigningInfo {
  @Field()
  address!: string

  @Field(() => Int)
  start_height!: number

  @Field(() => Int)
  index_offset!: number

  @Field()
  jailed_until!: string

  @Field()
  tombstoned!: boolean

  @Field(() => Int)
  missed_blocks_counter!: number
}
