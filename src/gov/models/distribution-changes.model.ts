import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class DistributionChanges {
  @Field({ nullable: true })
  community_tax?: string

  @Field({ nullable: true })
  base_proposer_reward?: string

  @Field({ nullable: true })
  bonus_proposer_reward?: string

  @Field({ nullable: true })
  withdraw_add_renabled?: boolean
}
