import { Field, ObjectType } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { PublicKeyType } from 'src/common/unions'
import { ModeInfo } from 'src/lcd'

@ObjectType()
export class ProtoSignerInfos {
  @Field(() => AnythingScalar)
  public_key!: PublicKeyType

  @Field(() => AnythingScalar)
  mode_info!: ModeInfo.Data

  @Field()
  sequence!: string
}
