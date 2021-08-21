import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import {
  WasmMsg as TerraWasmMsg,
  MsgMigrateContract as TerraMsgMigrateContract,
  MsgUpdateContractOwner as TerraMsgUpdateContractOwner,
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

  constructor(data: MsgStoreCode) {
    Object.assign(this, data)
  }
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

  constructor(data: MsgInstantiateContract) {
    Object.assign(this, data)
  }
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

  constructor(data: MsgExecuteContract) {
    Object.assign(this, data)
  }
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

  constructor(data: MsgMigrateContract) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgUpdateContractOwner {
  @Field()
  owner!: string

  @Field()
  new_owner!: string

  @Field()
  contract!: string

  constructor(data: MsgUpdateContractOwner) {
    Object.assign(this, data)
  }
}

export class WasmMsg {
  static fromTerraMsg(
    msg: TerraWasmMsg,
  ): MsgStoreCode | MsgInstantiateContract | MsgExecuteContract | MsgMigrateContract | MsgUpdateContractOwner {
    if (msg instanceof TerraMsgInstantiateContract) {
      return new MsgInstantiateContract({
        owner: msg.owner,
        code_id: msg.code_id,
        init_msg: msg.init_msg,
        init_coins: Coin.fromTerraCoins(msg.init_coins),
        migratable: msg.migratable,
      })
    }

    if (msg instanceof TerraMsgExecuteContract) {
      return new MsgExecuteContract({
        sender: msg.sender,
        contract: msg.contract,
        execute_msg: msg.execute_msg,
        coins: Coin.fromTerraCoins(msg.coins),
      })
    }

    if (msg instanceof TerraMsgMigrateContract) {
      return new MsgMigrateContract(msg)
    }

    if (msg instanceof TerraMsgUpdateContractOwner) {
      return new MsgUpdateContractOwner(msg)
    }

    return new MsgStoreCode(msg)
  }
}
