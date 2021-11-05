import { Field, Int, ObjectType } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { StdFee } from './std-fee.model'

@ObjectType()
export class StdSignMsg {
  @Field()
  chain_id!: string

  @Field(() => Int)
  account_number!: number

  @Field(() => Int)
  sequence!: number

  @Field(() => StdFee)
  fee!: StdFee

  @Field(() => [AnythingScalar])
  msgs!: any[]

  @Field(() => String, { defaultValue: '' })
  memo!: ''
}
