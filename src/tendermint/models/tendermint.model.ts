import { Field, ObjectType } from '@nestjs/graphql'
import { NodeInfo, ValidatorSet, BlockInfo } from '.'

@ObjectType()
export class Tendermint {
  @Field(() => NodeInfo)
  nodeInfo!: Promise<NodeInfo>

  @Field(() => Boolean)
  syncing!: Promise<boolean>

  @Field(() => ValidatorSet)
  validatorSet!: Promise<ValidatorSet>

  @Field(() => BlockInfo)
  blockInfo!: Promise<BlockInfo>
}
