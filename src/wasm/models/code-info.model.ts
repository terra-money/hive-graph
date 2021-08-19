import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CodeInfo {
  @Field()
  code_hash!: string

  @Field()
  code_creator!: string
}
