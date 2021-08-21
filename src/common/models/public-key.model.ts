import { Field, ObjectType } from '@nestjs/graphql'
import { PublicKey as TerraPublicKey } from 'nestjs-terra'

@ObjectType()
export class PublicKey {
  @Field()
  type!: string

  @Field()
  value!: string

  static fromTerraKey(key: TerraPublicKey | null): PublicKey | MultisigPublicKey | null {
    if (!key) {
      return null
    }

    if (typeof key.value === 'string') {
      return {
        type: key.type,
        value: key.value,
      }
    }
    return {
      type: key.type,
      threshold: key.value.threshold,
      pubkeys: key.value.pubkeys.map<PublicKey>((pk) => ({
        type: pk.type,
        value: pk.value,
      })),
    }
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
}
