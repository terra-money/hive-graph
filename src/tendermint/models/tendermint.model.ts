import { Field, ObjectType } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { BlockInfo, DelegateValidator } from '.'

@ObjectType()
export class Tendermint {
  @Field(() => AnythingScalar)
  nodeInfo!: Promise<any>

  @Field(() => Boolean)
  syncing!: Promise<boolean>

  @Field(() => [DelegateValidator])
  validatorSet!: Promise<DelegateValidator[]>

  @Field(() => BlockInfo)
  blockInfo!: Promise<BlockInfo>
}
