import { Field, ArgsType } from '@nestjs/graphql'
import { GetRequiredDelegatorArgs } from 'src/common/arguments/required.args'
import { ValAddress } from 'src/lcd'

@ArgsType()
export class GetStakingArgs extends GetRequiredDelegatorArgs {
  @Field(() => String, { nullable: true })
  validatorSrc?: ValAddress

  @Field(() => String, { nullable: true })
  validatorDst?: ValAddress
}
