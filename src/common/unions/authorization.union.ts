import { createUnionType } from '@nestjs/graphql'
import { SendAuthorization, GenericAuthorization, StakeAuthorization } from '../models'

export const AuthorizationUnion = createUnionType({
  name: 'AuthorizationUnion',
  types: () => [SendAuthorization, GenericAuthorization, StakeAuthorization],
})

export type AuthorizationType = typeof AuthorizationUnion
