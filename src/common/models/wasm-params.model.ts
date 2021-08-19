import { ObjectType, Int, Field } from '@nestjs/graphql'

@ObjectType()
export class WasmParams {
  @Field(() => Int, { nullable: true })
  max_contract_size?: number

  @Field(() => Int, { nullable: true })
  max_contract_gas?: number

  @Field(() => Int, { nullable: true })
  max_contract_msg_size?: number
}
