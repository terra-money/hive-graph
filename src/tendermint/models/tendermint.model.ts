import { Field, ObjectType } from '@nestjs/graphql'
import { NodeInfo, BlockInfo, DelegateValidator } from '.'

@ObjectType()
export class Tendermint {
  @Field(() => NodeInfo)
  nodeInfo!: Promise<NodeInfo>

  @Field(() => Boolean)
  syncing!: Promise<boolean>

  @Field(() => [DelegateValidator])
  validatorSet!: Promise<DelegateValidator[]>

  @Field(() => BlockInfo)
  blockInfo!: Promise<BlockInfo>
}
