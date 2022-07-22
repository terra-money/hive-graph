import { Test, TestingModule } from '@nestjs/testing'
import { parseSpecData } from '../../test/parse-spec'
import { AppModule } from '../app.module'
import { GovResolver } from './gov.resolver'
import { GovService } from './gov.service'

describe('GovResolver', () => {
  let resolver: GovResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [GovResolver, { provide: GovService, useValue: {} }],
    }).compile()

    resolver = module.get<GovResolver>(GovResolver)

    data = parseSpecData(__dirname + '/gov.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should resolve depositParameters', async () => {
    const result = resolver.depositParameters(data.depositParameters.params)
    await expect(result).resolves.toEqual(data.depositParameters.result)
  })

  it('should resolve deposits', async () => {
    const result = resolver.deposits(data.deposits.params)
    await expect(result).resolves.toEqual(data.deposits.result)
  })

  it('should resolve parameters', async () => {
    const result = resolver.parameters(data.parameters.params)
    await expect(result).resolves.toEqual(data.parameters.result)
  })

  it('should resolve tallyParameters', async () => {
    const result = resolver.tallyParameters(data.tallyParameters.params)
    await expect(result).resolves.toEqual(data.tallyParameters.result)
  })

  it('should resolve votingParameters', async () => {
    const result = resolver.votingParameters(data.votingParameters.params)
    await expect(result).resolves.toEqual(data.votingParameters.result)
  })

  it('should resolve proposal', async () => {
    const result = resolver.proposal(data.proposal.params)
    await expect(result).resolves.toEqual(data.proposal.result)
  })

  // structure already checked with proposal
  // so let's just check count
  it('should resolve proposals', async () => {
    const result = resolver.proposals(data.proposals.params)
    await expect(result).resolves.toHaveLength(data.proposals.result)
  })

  it('should resolve proposer', async () => {
    const result = resolver.proposer(data.proposer.params)
    await expect(result).resolves.toEqual(data.proposer.result)
  })

  it('should resolve tally', async () => {
    const result = resolver.tally(data.tally.params)
    await expect(result).resolves.toEqual(data.tally.result)
  })

  it('should resolve votes', async () => {
    const result = resolver.votes(data.votes.params)
    await expect(result).resolves.toEqual(data.votes.result)
  })
})
