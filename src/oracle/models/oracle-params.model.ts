import { Field, Int, ObjectType } from '@nestjs/graphql'
import { OracleWhitelist } from 'src/common/models'

@ObjectType()
export class OracleParams {
  @Field(() => Int)
  vote_period!: number

  @Field()
  vote_threshold!: string

  @Field()
  reward_band!: string

  @Field(() => Int)
  reward_distribution_window!: number

  @Field(() => [OracleWhitelist])
  whitelist!: OracleWhitelist[]

  @Field()
  slash_fraction!: string

  @Field(() => Int)
  slash_window!: number

  @Field()
  min_valid_per_window!: string
}
