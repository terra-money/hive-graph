import { Field, ObjectType } from '@nestjs/graphql'
import {
  PublicKey as TerraPublicKey,
  SimplePublicKey as TerraSimplePublicKey,
  ValConsPublicKey as TerraValConsPublicKey,
} from 'src/lcd'

@ObjectType()
export class SimplePublicKey {
  @Field()
  key!: string

  constructor(key: string) {
    this.key = key
  }
}

@ObjectType()
export class LegacyAminoMultisigPublicKey {
  @Field()
  threshold!: number

  @Field(() => [SimplePublicKey])
  public_keys!: SimplePublicKey[]

  constructor(threshold: number, public_keys: SimplePublicKey[]) {
    this.threshold = threshold
    this.public_keys = public_keys
  }
}

@ObjectType()
export class ValConsPublicKey {
  @Field()
  key!: string

  constructor(key: string) {
    this.key = key
  }
}

@ObjectType()
export class PublicKey {
  static fromTerraKey(
    key: TerraPublicKey | null,
  ): SimplePublicKey | ValConsPublicKey | LegacyAminoMultisigPublicKey | null {
    if (!key) {
      return null
    }

    if (key instanceof TerraSimplePublicKey) {
      return new SimplePublicKey(key.key)
    }

    if (key instanceof TerraValConsPublicKey) {
      return new ValConsPublicKey(key.key)
    }

    return new LegacyAminoMultisigPublicKey(
      key.threshold,
      key.pubkeys.map((pubkey) => ({
        key: pubkey.key,
      })),
    )
  }
}
