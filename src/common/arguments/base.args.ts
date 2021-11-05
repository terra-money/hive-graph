import { ArgsType, Field, Float } from '@nestjs/graphql'

@ArgsType()
export class GetBaseArgs {
  @Field(() => Float, { nullable: true })
  height?: number
}
