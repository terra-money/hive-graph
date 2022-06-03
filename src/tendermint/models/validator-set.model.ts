import { Field, ObjectType } from '@nestjs/graphql'

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
}
