import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class OracleWhitelist {
  @Field()
  name!: string

  @Field()
  tobin_tax!: string
}
