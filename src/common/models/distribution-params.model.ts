import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DistributionParams {
  @Field({ nullable: true })
  community_tax?: string

  @Field({ nullable: true })
  base_proposer_reward?: string

  @Field({ nullable: true })
  bonus_proposer_reward?: string

  @Field({ nullable: true })
  withdraw_addr_enabled?: boolean
}
