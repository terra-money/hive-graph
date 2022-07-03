import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tally {
  @Field()
  yes: string

  @Field()
  abstain: string

  @Field()
  no: string

  @Field()
  no_with_veto: string

  constructor(yes: string, abstain: string, no: string, noWithVeto: string) {
    this.yes = yes
    this.abstain = abstain
    this.no = no
    this.no_with_veto = noWithVeto
  }
}
