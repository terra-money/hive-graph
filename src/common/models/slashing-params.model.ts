import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SlashingParams {
  @Field(() => Int, { nullable: true })
  max_evidence_age?: number

  @Field(() => Int, { nullable: true })
  signed_blocks_window?: number

  @Field({ nullable: true })
  min_signed_per_window?: string

  // GraphQL doesn't support integers larger than 32 bits
  @Field({ nullable: true })
  downtime_jail_duration?: string

  @Field({ nullable: true })
  slash_fraction_double_sign?: string

  @Field({ nullable: true })
  slash_fraction_downtime?: string
}
