import { Field, ObjectType } from '@nestjs/graphql'
import { PublicKey as TerraPublicKey } from 'nestjs-terra'

@ObjectType()
export class PublicKey {
  @Field()
  type!: string

  @Field()
  value!: string

  constructor(data: PublicKey) {
    Object.assign(this, data)
  }

  static fromTerraKey(key: TerraPublicKey | null): PublicKey | MultisigPublicKey | null {
    if (!key) {
      return null
    }

    if (typeof key.value === 'string') {
      return new PublicKey({
        type: key.type,
        value: key.value,
      })
    }

    return new MultisigPublicKey({
      type: key.type,
      threshold: key.value.threshold,
      pubkeys: key.value.pubkeys.map<PublicKey>((pk) => ({
        type: pk.type,
        value: pk.value,
      })),
    })
  }
}

@ObjectType()
export class MultisigPublicKey {
  @Field()
  type!: string

  @Field()
  threshold!: string

  @Field(() => [PublicKey])
  pubkeys!: PublicKey[]

  constructor(data: MultisigPublicKey) {
    Object.assign(this, data)
  }
}
