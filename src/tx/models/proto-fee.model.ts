import { Field, ObjectType } from '@nestjs/graphql'
import { Coins } from '@terra-money/terra.js'
import { ProtoCoin } from 'src/common/models/proto-coin.model'

@ObjectType()
export class ProtoFee {
  @Field()
  gas_limit!: string

  @Field()
  payer!: string

  @Field()
  granter!: string

  @Field(() => [ProtoCoin])
  amount!: Coins.Data[]
}
