import { Field, ObjectType } from '@nestjs/graphql'
import { Denom } from 'src/common/enums'

@ObjectType()
export class ExchangeRateVote {
  @Field()
  exchange_rate!: string

  @Field(() => Denom, { nullable: true })
  denom?: string

  @Field({ nullable: true })
  voter?: string
}
