import { ArgsType, Field } from '@nestjs/graphql'
import { GetBaseArgs } from './base.args'

@ArgsType()
export class GetAddressArgs extends GetBaseArgs {
  @Field()
  address!: string
}
