import { Test, TestingModule } from '@nestjs/testing'
import { parseSpecData } from '../../test/parse-spec'
import { AppModule } from '../app.module'
import { DistributionResolver } from './distribution.resolver'
import { DistributionService } from './distribution.service'

describe('DistributionResolver', () => {
  let resolver: DistributionResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DistributionResolver, { provide: DistributionService, useValue: {} }],
    }).compile()

    resolver = module.get<DistributionResolver>(DistributionResolver)

    data = parseSpecData(__dirname + '/distribution.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should resolve communityPool', async () => {
    const result = resolver.communityPool(data.communityPool.params)
    await expect(result).resolves.toEqual(data.communityPool.result)
  })

  it('should resolve parameters', async () => {
    const result = resolver.parameters(data.parameters.params)
    await expect(result).resolves.toEqual(data.parameters.result)
  })

  it('should resolve rewards', async () => {
    const params = data.rewards.params as [any, any]
    const result = resolver.rewards(...params)
    await expect(result).resolves.toEqual(data.rewards.result)
  })

  it('should resolve withdrawAddress', async () => {
    const params = data.withdrawAddress.params as [any, any]
    const result = resolver.withdrawAddress(...params)
    await expect(result).resolves.toEqual(data.withdrawAddress.result)
  })
})
