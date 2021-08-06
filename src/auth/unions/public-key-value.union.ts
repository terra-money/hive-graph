import { createUnionType } from '@nestjs/graphql'
import { MultisigPublicKey, PublicKey } from '../models'

export const PublicKeyUnion = createUnionType({
  name: 'PublicKeyUnion',
  types: () => [PublicKey, MultisigPublicKey],
})
