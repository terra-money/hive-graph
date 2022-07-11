import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Parts {
  @Field()
  total!: string

  @Field()
  hash!: string
}

@ObjectType()
export class BlockId {
  @Field()
  hash!: string

  @Field(() => Parts)
  part_set_header!: Parts
}

@ObjectType()
export class BlockData {
  @Field(() => [String], { nullable: true })
  txs!: string[] | null
}

@ObjectType()
export class Evidence {
  @Field(() => [String], { nullable: true })
  evidence!: string[] | null
}

@ObjectType()
export class Version {
  @Field()
  block!: string

  @Field()
  app!: string
}

@ObjectType()
export class Header {
  @Field(() => Version)
  version!: Version

  @Field()
  chain_id!: string

  @Field()
  height!: string

  @Field()
  time!: string

  @Field(() => BlockId)
  last_block_id!: BlockId

  @Field()
  last_commit_hash!: string

  @Field()
  data_hash!: string

  @Field()
  validators_hash!: string

  @Field()
  next_validators_hash!: string

  @Field()
  consensus_hash!: string

  @Field()
  app_hash!: string

  @Field()
  last_results_hash!: string

  @Field()
  evidence_hash!: string

  @Field()
  proposer_address!: string
}

@ObjectType()
export class LastCommit {
  @Field()
  height!: string

  @Field()
  round!: number

  @Field(() => BlockId)
  block_id!: BlockId

  @Field(() => [Signature])
  signatures!: Signature[]
}

@ObjectType()
export class Signature {
  @Field(() => Int)
  block_id_flag!: number

  @Field({ nullable: true })
  validator_address?: string

  @Field()
  timestamp!: string

  @Field({ nullable: true })
  signature?: string
}

@ObjectType()
export class Block {
  @Field(() => Header)
  header!: Header

  @Field(() => BlockData)
  data!: BlockData

  @Field(() => Evidence, { nullable: true })
  evidence!: Evidence

  @Field(() => LastCommit, { nullable: true })
  last_commit!: LastCommit
}

@ObjectType()
export class BlockInfo {
  @Field(() => BlockId)
  block_id!: BlockId

  @Field(() => Block)
  block!: Block
}
