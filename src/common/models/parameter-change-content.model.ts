import { ObjectType, Field } from '@nestjs/graphql'
import { ParamChanges } from 'src/lcd'
import { ProposalContent } from '../interfaces'

export enum ParameterChangesSubspaces {
  DISTRIBUTION = 'distribution',
  STAKING = 'staking',
  SLASHING = 'slashing',
  TREASURY = 'treasury',
  ORACLE = 'oracle',
  MARKET = 'market',
  GOV = 'gov',
  MINT = 'mint',
  WASM = 'wasm',
}

@ObjectType()
export class ParameterChanges {
  @Field()
  subspace!: string

  @Field()
  key!: string

  @Field()
  value!: string
}

@ObjectType({
  implements: () => [ProposalContent],
})
export class ParameterChangeContent implements ProposalContent {
  title: string

  description: string

  @Field(() => [ParameterChanges], { nullable: true })
  changes?: ParameterChanges[]

  constructor(title: string, description: string, changes: ParamChanges) {
    this.title = title
    this.description = description
    this.changes = changes.toProto().map((change) => ({
      subspace: change.subspace,
      key: change.key,
      value: change.value,
    }))
  }
}
