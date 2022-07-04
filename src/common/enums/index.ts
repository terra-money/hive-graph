import { registerEnumType } from '@nestjs/graphql'

export type Denom = string

export enum ProposalStatus {
  DepositPeriod = 1,
  VotingPeriod = 2,
  Passed = 3,
  Rejected = 4,
  Failed = 5,
}

export enum VoteOption {
  Empty = 0,
  Yes = 1,
  Abstain = 2,
  No = 3,
  NoWithVeto = 4,
}

export enum OrderBy {
  ORDER_BY_ASC = 1,
  ORDER_BY_DESC = 2,
}

export function registerEnums() {
  registerEnumType(ProposalStatus, {
    name: 'ProposalStatus',
  })

  registerEnumType(VoteOption, {
    name: 'VoteOption',
  })

  registerEnumType(OrderBy, {
    name: 'OrderBy',
  })
}
