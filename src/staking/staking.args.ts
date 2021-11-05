import { Field, ArgsType } from '@nestjs/graphql'
import { ValAddress } from 'nestjs-terra'
import { GetRequiredDelegatorArgs } from 'src/common/arguments/required.args'

@ArgsType()
export class GetStakingArgs extends GetRequiredDelegatorArgs {
  @Field(() => String, { nullable: true })
  validatorSrc?: ValAddress

  @Field(() => String, { nullable: true })
  validatorDst?: ValAddress
}
