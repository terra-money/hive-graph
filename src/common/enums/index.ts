import { registerEnumType } from '@nestjs/graphql'

export type Denom = string

export enum ProposalStatus {
  DepositPeriod = 'DepositPeriod',
  VotingPeriod = 'VotingPeriod',
  Passed = 'Passed',
  Rejected = 'Rejected',
  Failed = 'Failed',
}

export enum VoteOption {
  Empty = 'Empty',
  Yes = 'Yes',
  Abstain = 'Abstain',
  No = 'No',
  NoWithVeto = 'NoWithVeto',
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
