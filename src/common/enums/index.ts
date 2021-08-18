import { registerEnumType } from '@nestjs/graphql'

export enum Denom {
  uluna = 'uluna',
  ucny = 'ucny',
  ueur = 'ueur',
  ugbp = 'ugbp',
  ujpy = 'ujpy',
  ukrw = 'ukrw',
  umnt = 'umnt',
  usdr = 'usdr',
  uusd = 'uusd',
  uinr = 'uinr',
  ucad = 'ucad',
  uchf = 'uchf',
  uaud = 'uaud',
  usgd = 'usgd',
  udkk = 'udkk', // No in terrajs
  uhkd = 'uhkd', // No in terrajs
  unok = 'unok', // No in terrajs
  usek = 'usek', // No in terrajs
  uthb = 'uthb', // No in terrajs
  unused = 'unused', // No in terrajs
}

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

export function registerEnums() {
  registerEnumType(Denom, {
    name: 'Denom',
  })

  registerEnumType(ProposalStatus, {
    name: 'ProposalStatus',
  })

  registerEnumType(VoteOption, {
    name: 'VoteOption',
  })
}
