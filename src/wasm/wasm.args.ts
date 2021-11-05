import { Int } from '@nestjs/graphql'
import { ArgsType, Field } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { GetBaseArgs } from 'src/common/arguments/base.args'

@ArgsType()
export class GetWasmCodeIDArgs extends GetBaseArgs {
  @Field(() => Int)
  codeID!: number
}

@ArgsType()
export class GetWasmQueryArgs extends GetBaseArgs {
  @Field(() => GraphQLJSON)
  query!: Record<string, any>
}
