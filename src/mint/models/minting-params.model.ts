import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Denom } from 'src/common/enums'

@ObjectType()
export class MintingParams {
  @Field(() => Denom)
  mint_denom!: string

  @Field()
  inflation_rate_change!: string

  @Field()
  inflation_max!: string

  @Field()
  inflation_min!: string

  @Field()
  goal_bonded!: string

  @Field(() => Int)
  blocks_per_year!: number
}
