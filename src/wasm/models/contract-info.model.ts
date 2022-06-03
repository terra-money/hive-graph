import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
export class ContractInfo {
  @Field(() => Int)
  code_id!: number

  @Field({ nullable: true })
  address?: string

  @Field()
  owner!: string

  @Field(() => GraphQLJSON)
  init_msg!: Record<string, any>

  @Field(() => String, { nullable: true })
  admin?: string | null
}
