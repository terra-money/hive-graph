import { Field, ObjectType } from '@nestjs/graphql'
import { Pagination } from 'src/common/models/index'

@ObjectType()
export class DelegateValidator {
  @Field()
  address!: string

  @Field()
  pub_key!: string

  @Field()
  proposer_priority!: string

  @Field()
  voting_power!: string
}

@ObjectType()
export class ValidatorSet {
  @Field(() => [DelegateValidator])
  validators!: DelegateValidator[]

  @Field(() => Pagination)
  pagination!: Pagination
}
