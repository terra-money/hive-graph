import { Field, InputType } from '@nestjs/graphql'
import { OrderBy } from 'src/common/enums/index'

@InputType()
export class PaginationOptions {
  @Field(() => String)
  limit!: string

  @Field(() => String)
  offset!: string

  @Field(() => String)
  key!: string

  @Field(() => String)
  count_total!: string

  @Field(() => String)
  reverse!: string

  @Field(() => OrderBy)
  order_by!: keyof typeof OrderBy
}
