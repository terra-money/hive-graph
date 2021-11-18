import { Field, ObjectType } from '@nestjs/graphql'
import { IbcParams } from 'src/common/models'
import { DenomTraces, DenomTrace } from './index'

@ObjectType()
export class Ibc {
  @Field(() => IbcParams)
  parameters!: Promise<IbcParams>

  @Field(() => DenomTraces)
  denomTraces!: Promise<DenomTraces>

  @Field(() => DenomTrace)
  denomTrace!: Promise<DenomTrace>
}
