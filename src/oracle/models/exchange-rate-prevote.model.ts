import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Denom } from 'src/common/enums'

@ObjectType()
export class ExchangeRatePrevote {
  @Field({ nullable: true })
  hash?: string

  @Field(() => Denom, { nullable: true })
  denom?: string

  @Field({ nullable: true })
  voter?: string

  @Field(() => Int, { nullable: true })
  submit_block?: number
}
