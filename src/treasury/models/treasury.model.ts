import { Field, ObjectType } from '@nestjs/graphql'
import { Coin, TreasuryParams } from 'src/common/models'

@ObjectType()
export class Treasury {
  @Field(() => Coin)
  taxCap!: Promise<Coin>

  @Field(() => String)
  taxRate!: Promise<string>

  @Field(() => String)
  rewardWeight!: Promise<string>

  @Field(() => [Coin])
  taxProceeds!: Promise<Coin[]>

  @Field(() => Coin)
  seigniorageProceeds!: Promise<Coin>

  @Field(() => TreasuryParams)
  parameters!: Promise<TreasuryParams>
}
