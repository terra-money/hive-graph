import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { ValidatorVotingPower } from './validator-voting-power.model'

@ObjectType()
export class Utils {
  @Field(() => Coin)
  calculateTax!: Promise<Coin>

  @Field(() => [ValidatorVotingPower])
  validatorsWithVotingPower!: Promise<ValidatorVotingPower[]>
}
