import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class MintChanges {
  @Field({ nullable: true })
  mint_denom?: string

  @Field({ nullable: true })
  inflation_rate?: string

  @Field({ nullable: true })
  inflation_max?: string

  @Field({ nullable: true })
  inflation_min?: string

  @Field({ nullable: true })
  goal_bonded?: string

  @Field(() => Int, { nullable: true })
  blocks_per_year?: number
}
