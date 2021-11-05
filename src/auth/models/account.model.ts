import { Field, ObjectType, Int } from '@nestjs/graphql'
import { AccAddress } from 'nestjs-terra'
import { PublicKeyType, PublicKeyUnion } from 'src/common/unions'

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
