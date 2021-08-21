import { Field, ObjectType } from '@nestjs/graphql'
import { BankMsg as TerraBankMsg, MsgMultiSend as TerraMsgMultiSend } from 'nestjs-terra'
import { Coin } from 'src/common/models'

@ObjectType()
export class MsgSend {
  @Field()
  from_address!: string

  @Field()
  to_address!: string

  @Field(() => [Coin])
  amount!: Coin[]

  constructor(data: MsgSend) {
    Object.assign(this, data)
  }
}

@ObjectType()
export class IOData {
  @Field()
  address!: string

  @Field(() => [Coin])
  coins!: Coin[]
}

@ObjectType()
export class MsgMultiSend {
  @Field(() => [IOData])
  inputs!: IOData[]

  @Field(() => [IOData])
  outputs!: IOData[]

  constructor(data: MsgMultiSend) {
    Object.assign(this, data)
  }
}

export class BankMsg {
  static fromTerraIOData(io: TerraMsgMultiSend.IO): IOData {
    return {
      address: io.address,
      coins: Coin.fromTerraCoins(io.coins),
    }
  }

  static fromTerraMsg(msg: TerraBankMsg): MsgSend | MsgMultiSend {
    if (msg instanceof TerraMsgMultiSend) {
      return new MsgMultiSend({
        inputs: msg.inputs.map<IOData>(BankMsg.fromTerraIOData),
        outputs: msg.outputs.map<IOData>(BankMsg.fromTerraIOData),
      })
    }

    return new MsgSend({
      from_address: msg.from_address,
      to_address: msg.to_address,
      amount: Coin.fromTerraCoins(msg.amount),
    })
  }
}
