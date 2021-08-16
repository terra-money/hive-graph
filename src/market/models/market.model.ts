import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'
import { MarketParams } from './market-params.model'

@ObjectType()
export class Market {
  @Field(() => Coin)
  swapRate!: Promise<Coin>

  @Field(() => String)
  terraPoolDelta!: Promise<string>

  @Field(() => MarketParams)
  parameters!: Promise<MarketParams>
}
