import { Field, Int, ObjectType } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import {
  WasmMsg as TerraWasmMsg,
  MsgMigrateContract as TerraMsgMigrateContract,
  MsgInstantiateContract as TerraMsgInstantiateContract,
  MsgExecuteContract as TerraMsgExecuteContract,
  MsgMigrateCode as TerraMsgMigrateCode,
  MsgUpdateContractAdmin as TerraMsgUpdateContractAdmin,
  MsgClearContractAdmin as TerraMsgClearContractAdmin,
} from 'nestjs-terra'
import {
  WasmMsg as LegacyTerraWasmMsg,
  MsgInstantiateContract as LegacyMsgInstantiateContract,
  MsgExecuteContract as LegacyMsgExecuteContract,
  MsgMigrateContract as LegacyMsgMigrateContract,
  MsgUpdateContractOwner as LegacyMsgUpdateContractOwner,
} from 'nestjs-terra-legacy'
import { MsgUpdateContractOwner as TerraMsgUpdateContractOwner } from 'nestjs-terra-legacy'
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

  @Field(() => String, { nullable: true })
  admin?: string | null

  @Field(() => Boolean, { nullable: true })
  migratable?: boolean | null

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

  @Field(() => Int)
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

@ObjectType()
export class MsgMigrateCode {
  @Field()
  sender!: string

  @Field(() => Int)
  code_id!: number

  @Field()
  wasm_byte_code!: string

  constructor(data: MsgMigrateCode) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgUpdateContractAdmin {
  @Field()
  admin!: string

  @Field()
  new_admin!: string

  @Field()
  contract!: string

  constructor(data: MsgUpdateContractAdmin) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class MsgClearContractAdmin {
  @Field()
  admin!: string

  @Field()
  contract!: string

  constructor(data: MsgClearContractAdmin) {
    Object.assign(this, data)
  }
}

export class WasmMsg {
  static fromTerraMsg(
    msg: TerraWasmMsg | LegacyTerraWasmMsg,
  ):
    | MsgStoreCode
    | MsgInstantiateContract
    | MsgExecuteContract
    | MsgMigrateContract
    | MsgUpdateContractOwner
    | MsgMigrateCode
    | MsgUpdateContractAdmin
    | MsgClearContractAdmin {
    if (msg instanceof TerraMsgInstantiateContract || msg instanceof LegacyMsgInstantiateContract) {
      return new MsgInstantiateContract({
        owner: msg instanceof TerraMsgInstantiateContract ? msg.sender : msg.owner,
        code_id: msg.code_id,
        init_msg: msg.init_msg,
        init_coins: Coin.fromTerraCoins(msg.init_coins),
        admin: msg instanceof TerraMsgInstantiateContract ? msg.admin ?? null : null,
        migratable: msg instanceof LegacyMsgInstantiateContract ? msg.migratable : null,
      })
    }

    if (msg instanceof TerraMsgExecuteContract || msg instanceof LegacyMsgExecuteContract) {
      return new MsgExecuteContract({
        sender: msg.sender,
        contract: msg.contract,
        execute_msg: msg.execute_msg,
        coins: Coin.fromTerraCoins(msg.coins),
      })
    }

    if (msg instanceof TerraMsgMigrateContract || msg instanceof LegacyMsgMigrateContract) {
      return new MsgMigrateContract({
        owner: msg instanceof TerraMsgMigrateContract ? msg.admin : msg.owner,
        contract: msg.contract,
        new_code_id: msg.new_code_id,
        migrate_msg: msg.migrate_msg,
      })
    }

    if (msg instanceof TerraMsgUpdateContractOwner || msg instanceof LegacyMsgUpdateContractOwner) {
      return new MsgUpdateContractOwner(msg)
    }

    if (msg instanceof TerraMsgMigrateCode) {
      return new MsgMigrateCode(msg)
    }

    if (msg instanceof TerraMsgUpdateContractAdmin) {
      return new MsgUpdateContractAdmin(msg)
    }

    if (msg instanceof TerraMsgClearContractAdmin) {
      return new MsgClearContractAdmin(msg)
    }

    return new MsgStoreCode(msg)
  }
}
