import { Field, ObjectType, Int } from '@nestjs/graphql'
import { PublicKeyType, PublicKeyUnion } from 'src/common/unions'
import { AccAddress } from 'src/lcd'

@ObjectType()
export class Account {
  @Field(() => String)
  address!: AccAddress

  @Field(() => PublicKeyUnion, { nullable: true })
  public_key?: PublicKeyType | null

  @Field(() => Int)
  account_number!: number

  @Field(() => Int)
  sequence!: number
}
