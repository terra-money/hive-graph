import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class VotingParams {
  @Field(() => Int)
  voting_period!: number
}
