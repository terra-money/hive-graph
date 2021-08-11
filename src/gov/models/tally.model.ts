import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class Tally {
  @Field(() => Int)
  yes: number

  @Field(() => Int)
  abstain: number

  @Field(() => Int)
  no: number

  @Field(() => Int)
  no_with_veto: number

  constructor(yes: number, abstain: number, no: number, noWithVeto: number) {
    this.yes = yes
    this.abstain = abstain
    this.no = no
    this.no_with_veto = noWithVeto
  }
}
