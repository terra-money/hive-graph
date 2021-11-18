import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class GetIbcArgs {
  @Field(() => String)
  hash!: string
}
