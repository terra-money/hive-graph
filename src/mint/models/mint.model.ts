import { Field, ObjectType } from '@nestjs/graphql'
import { MintingParams } from './minting-params.model'

@ObjectType()
export class Mint {
  @Field(() => String)
  inflation!: Promise<string>

  @Field(() => String)
  annualProvisions!: Promise<string>

  @Field(() => MintingParams)
  parameters!: Promise<MintingParams>
}
