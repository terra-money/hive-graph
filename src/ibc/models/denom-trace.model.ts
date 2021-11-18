import { Field, ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/common/models/index'

@ObjectType()
export class DenomTrace {
  @Field(() => String)
  path!: string

  @Field(() => String)
  base_denom!: string
}

@ObjectType()
export class DenomTraces {
  @Field(() => [DenomTrace])
  denom_traces!: DenomTrace[]

  @Field(() => Pagination)
  pagination!: Pagination
}
