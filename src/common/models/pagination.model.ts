import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Pagination {
  @Field(() => String, { nullable: true })
  next_key?: string | null

  @Field(() => Int)
  total!: number
}
