import { Field, ObjectType } from '@nestjs/graphql'
import {
  PublicKey as TerraPublicKey,
  SimplePublicKey as TerraSimplePublicKey,
  ValConsPublicKey as TerraValConsPublicKey,
} from 'nestjs-terra'

@ObjectType()
export class SimplePublicKey {
  @Field()
  key!: string
}

@ObjectType()
export class LegacyAminoMultisigPublicKey {
  @Field()
  threshold!: number

  @Field(() => [SimplePublicKey])
  public_keys!: SimplePublicKey[]
}

@ObjectType()
export class ValConsPublicKey {
  @Field()
  key!: string
}

@ObjectType()
export class PublicKey {
  static fromTerraKey(
    key: TerraPublicKey | null,
  ): SimplePublicKey | ValConsPublicKey | LegacyAminoMultisigPublicKey | null {
    if (!key) {
      return null
    }

    if (key instanceof TerraSimplePublicKey || key instanceof TerraValConsPublicKey) {
      return {
        key: key.key,
      }
    }

    return {
      threshold: key.threshold,
      public_keys: key.pubkeys.map((pubkey) => ({
        key: pubkey.key,
      })),
    }
  }
}
