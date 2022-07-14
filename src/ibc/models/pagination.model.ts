import { Field, InputType } from '@nestjs/graphql'
import { OrderBy } from 'src/common/enums/index'

@InputType()
export class PaginationOptions {
  @Field(() => String, { nullable: true })
  limit?: string

  @Field(() => String, { nullable: true })
  offset?: string

  @Field(() => String, { nullable: true })
  key?: string

  @Field(() => String, { nullable: true })
  count_total?: string

  @Field(() => String, { nullable: true })
  reverse?: string

  @Field(() => OrderBy, { nullable: true })
  order_by?: keyof typeof OrderBy
}
