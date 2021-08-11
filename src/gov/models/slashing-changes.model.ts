import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class SlashingChanges {
  @Field(() => Int, { nullable: true })
  max_evidence_age?: number

  @Field(() => Int, { nullable: true })
  signed_blocks_window?: number

  @Field({ nullable: true })
  min_signed_per_window?: string

  @Field(() => Int, { nullable: true })
  downtime_jail_duration?: number

  @Field({ nullable: true })
  slash_fraction_double_sign?: string

  @Field({ nullable: true })
  slash_fraction_downtime?: string
}
