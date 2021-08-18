import { Field, ObjectType } from '@nestjs/graphql'
import { StakingParams, Validator } from 'src/common/models'
import { Delegation, UnbondingDelegation, Redelegation, StakingPool } from '.'

@ObjectType()
export class Staking {
  @Field(() => [Delegation])
  delegations!: Promise<Delegation[]>

  @Field(() => Delegation, { nullable: true })
  delegation!: Promise<Delegation>

  @Field(() => [UnbondingDelegation])
  unbondingDelegations!: Promise<UnbondingDelegation[]>

  @Field(() => UnbondingDelegation, { nullable: true })
  unbondingDelegation!: Promise<UnbondingDelegation>

  @Field(() => [Redelegation])
  redelegations!: Promise<Redelegation[]>

  @Field(() => [Validator])
  bondedValidators!: Promise<Validator[]>

  @Field(() => [Validator])
  validators!: Promise<Validator[]>

  @Field(() => Validator, { nullable: true })
  validator!: Promise<Validator>

  @Field(() => StakingPool)
  pool!: Promise<StakingPool>

  @Field(() => StakingParams)
  parameters!: Promise<StakingParams>
}
