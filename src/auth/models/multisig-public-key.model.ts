import { Field, ObjectType } from '@nestjs/graphql'
import { SimplePublicKey } from 'nestjs-terra'
import { PublicKey } from './public-key.model'

@ObjectType()
export class MultisigPublicKey {
  @Field()
  type: string

  @Field()
  threshold: string

  @Field(() => [PublicKey])
  pubkeys: PublicKey[]

  constructor(type: string, threshold: string, pubkeys: SimplePublicKey.Data[]) {
    this.type = type
    this.threshold = threshold
    this.pubkeys = pubkeys.map<PublicKey>((pk) => ({
      type: pk.type,
      value: pk.value,
    }))
  }
}
