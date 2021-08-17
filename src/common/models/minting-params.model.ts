import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Denom } from 'src/common/enums'

@ObjectType()
export class MintingParams {
  @Field(() => Denom, { nullable: true })
  mint_denom?: string

  @Field({ nullable: true })
  inflation_rate_change?: string

  @Field({ nullable: true })
  inflation_max?: string

  @Field({ nullable: true })
  inflation_min?: string

  @Field({ nullable: true })
  goal_bonded?: string

  @Field(() => Int, { nullable: true })
  blocks_per_year?: number
}
