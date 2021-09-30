import { Field, ObjectType } from '@nestjs/graphql'
import { ModeInfo, PublicKey } from '@terra-money/terra.js'
import { AnythingScalar } from 'src/anything.scalar'

@ObjectType()
export class ProtoSignerInfos {
  @Field(() => AnythingScalar)
  public_key!: PublicKey.Data

  @Field(() => AnythingScalar)
  mode_info!: ModeInfo.Data

  @Field()
  sequence!: string
}
