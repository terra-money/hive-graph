import { Field, ObjectType } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { StdFee } from './std-fee.model'
import { StdSignature } from './std-signature.model'

@ObjectType()
export class StdTx {
  @Field(() => [AnythingScalar])
  msg!: any[]

  @Field(() => StdFee)
  fee!: StdFee

  @Field(() => [StdSignature])
  signatures!: StdSignature[]

  @Field(() => String, { defaultValue: '' })
  memo = ''
}
