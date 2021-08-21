import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import {
  WasmMsg as TerraWasmMsg,
  MsgInstantiateContract as TerraMsgInstantiateContract,
  MsgExecuteContract as TerraMsgExecuteContract,
} from 'nestjs-terra'
import { Coin } from 'src/common/models'

@ObjectType()
export class MsgStoreCode {
  @Field()
  sender!: string

  @Field()
  wasm_byte_code!: string
}

@ObjectType()
export class MsgInstantiateContract {
  @Field()
  owner!: string

  @Field(() => Int)
  code_id!: number

  @Field(() => GraphQLJSON)
  init_msg!: Record<string, any>

  @Field(() => [Coin])
  init_coins!: Coin[]

  @Field()
  migratable!: boolean
}

@ObjectType()
export class MsgExecuteContract {
  @Field()
  sender!: string

  @Field()
  contract!: string

  @Field(() => GraphQLJSON)
  execute_msg!: Record<string, any>

  @Field(() => [Coin])
  coins!: Coin[]
}

@ObjectType()
export class MsgMigrateContract {
  @Field()
  owner!: string

  @Field()
  contract!: string

  @Field()
  new_code_id!: number

  @Field(() => GraphQLJSON)
  migrate_msg!: Record<string, any>
}

@ObjectType()
export class MsgUpdateContractOwner {
  @Field()
  owner!: string

  @Field()
  new_owner!: string

  @Field()
  contract!: string
}

export class WasmMsg {
  static fromTerraMsg(
    msg: TerraWasmMsg,
  ): MsgStoreCode | MsgInstantiateContract | MsgExecuteContract | MsgMigrateContract | MsgUpdateContractOwner {
    if (msg instanceof TerraMsgInstantiateContract) {
      return {
        owner: msg.owner,
        code_id: msg.code_id,
        init_msg: msg.init_msg,
        init_coins: Coin.fromTerraCoins(msg.init_coins),
        migratable: msg.migratable,
      }
    }

    if (msg instanceof TerraMsgExecuteContract) {
      return {
        sender: msg.sender,
        contract: msg.contract,
        execute_msg: msg.execute_msg,
        coins: Coin.fromTerraCoins(msg.coins),
      }
    }

    return msg
  }
}
