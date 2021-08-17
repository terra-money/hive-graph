import { Field, Int, ObjectType } from '@nestjs/graphql'
import { OracleWhitelist } from './oracle-whitelist.model'

@ObjectType()
export class OracleParams {
  @Field(() => Int, { nullable: true })
  vote_period?: number

  @Field({ nullable: true })
  vote_threshold?: string

  @Field({ nullable: true })
  reward_band?: string

  @Field(() => Int, { nullable: true })
  reward_distribution_window?: number

  @Field(() => [OracleWhitelist], { nullable: true })
  whitelist?: OracleWhitelist[]

  @Field({ nullable: true })
  slash_fraction?: string

  @Field(() => Int, { nullable: true })
  slash_window?: number

  @Field({ nullable: true })
  min_valid_per_window?: string
}
