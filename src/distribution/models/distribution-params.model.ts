import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DistributionParams {
  @Field()
  community_tax!: string

  @Field()
  base_proposer_reward!: string

  @Field()
  bonus_proposer_reward!: string

  @Field()
  withdraw_addr_enabled!: boolean
}
