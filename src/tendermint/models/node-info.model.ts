import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProtocolVersion {
  @Field()
  p2p!: string

  @Field()
  block!: string

  @Field()
  app!: string
}

@ObjectType()
export class OtherInfo {
  @Field()
  tx_index!: string

  @Field()
  rpc_address!: string
}

@ObjectType()
export class BuildDeps {
  @Field()
  path!: string

  @Field()
  version!: string

  @Field()
  sum!: string
}

@ObjectType()
export class ApplicationVersion {
  @Field()
  name!: string

  @Field()
  app_name!: string

  @Field()
  version!: string

  @Field()
  git_commit!: string

  @Field()
  build_tags!: string

  @Field()
  go_version!: string

  @Field(() => [BuildDeps])
  build_deps!: BuildDeps[]
}

@ObjectType()
export class NodeInfo {
  @Field(() => ID)
  id!: string

  @Field(() => ProtocolVersion)
  protocol_version!: ProtocolVersion

  @Field()
  listen_addr!: string

  @Field()
  network!: string

  @Field()
  version!: string

  @Field()
  channels!: string

  @Field()
  moniker!: string

  @Field(() => OtherInfo)
  other!: OtherInfo

  @Field(() => ApplicationVersion)
  application_version!: ApplicationVersion
}
