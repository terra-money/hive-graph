import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class MarketChanges {
  @Field(() => Int, { nullable: true })
  pool_recovery_period?: number

  @Field({ nullable: true })
  base_pool?: string

  @Field({ nullable: true })
  min_stability_spread?: string
}
