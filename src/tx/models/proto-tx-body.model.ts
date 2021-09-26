import { Field, ObjectType } from '@nestjs/graphql'
import { Msg } from '@terra-money/terra.js'
import { AnythingScalar } from 'src/anything.scalar'

@ObjectType()
export class ProtoTxBody {
  @Field(() => [AnythingScalar])
  messages!: Msg.Data[]

  @Field()
  memo?: string

  @Field()
  timeout_height?: number
}
