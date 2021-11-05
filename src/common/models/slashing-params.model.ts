import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SlashingParams {
  @Field(() => Int, { nullable: true })
  signed_blocks_window?: number | null

  @Field(() => String, { nullable: true })
  min_signed_per_window?: string | null

  // GraphQL doesn't support integers larger than 32 bits
  @Field(() => String, { nullable: true })
  downtime_jail_duration?: string | null

  @Field(() => String, { nullable: true })
  slash_fraction_double_sign?: string | null

  @Field(() => String, { nullable: true })
  slash_fraction_downtime?: string | null
}
