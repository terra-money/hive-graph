import { createUnionType } from '@nestjs/graphql'
import { SimplePublicKey, LegacyAminoMultisigPublicKey, ValConsPublicKey } from '../models'

export const PublicKeyUnion = createUnionType({
  name: 'PublicKeyUnion',
  types: () => [SimplePublicKey, LegacyAminoMultisigPublicKey, ValConsPublicKey],
})

export type PublicKeyType = typeof PublicKeyUnion
