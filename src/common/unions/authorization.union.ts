import { createUnionType } from '@nestjs/graphql'
import { SendAuthorization, GenericAuthorization } from '../models'

export const AuthorizationUnion = createUnionType({
  name: 'AuthorizationUnion',
  types: () => [SendAuthorization, GenericAuthorization],
})

export type AuthorizationType = typeof AuthorizationUnion
