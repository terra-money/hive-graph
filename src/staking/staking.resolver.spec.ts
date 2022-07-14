import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { parseSpecData } from '../../test/parse-spec'
import { StakingResolver } from './staking.resolver'
import { StakingService } from './staking.service'

describe('StakingResolver', () => {
  let resolver: StakingResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [StakingResolver, { provide: StakingService, useValue: {} }],
    }).compile()

    resolver = module.get<StakingResolver>(StakingResolver)

    data = parseSpecData(__dirname + '/staking.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
    expect(data.parameters).toBeDefined()
  })

  it('should resolve parameters', async () => {
    const result = resolver.parameters(data.parameters.params)
    await expect(result).resolves.toEqual(data.parameters.result)
  })

  it('should resolve bondedValidators', async () => {
    const params = data.bondedValidators.params as [any, any]
    const result = resolver.bondedValidators(...params)
    await expect(result).resolves.toEqual(data.bondedValidators.result)
  })

  it('should resolve delegation', async () => {
    const params = data.delegation.params as [any, any]
    const result = resolver.delegation(...params)
    await expect(result).resolves.toEqual(data.delegation.result)
  })

  it('should resolve delegations with delegator', async () => {
    const paramsDelegator = data.delegationsDelegator.params as [any, any]
    const resultDelegator = resolver.delegations(...paramsDelegator)
    await expect(resultDelegator).resolves.toEqual(data.delegationsDelegator.result)
  })

  it('should resolve delegations with validator', async () => {
    const paramsValidator = data.delegationsValidator.params as [any, any]
    const resultValidator = resolver.delegations(...paramsValidator)
    await expect(resultValidator).resolves.toEqual(data.delegationsValidator.result)
  }, 20000)

  it('should resolve pool', async () => {
    const result = resolver.pool(data.pool.params)
    await expect(result).resolves.toEqual(data.pool.result)
  })

  it('should resolve redelegations', async () => {
    const result = resolver.redelegations(data.redelegations.params)
    await expect(result).resolves.toEqual(data.redelegations.result)
  })

  // unbondingDelegation function in service does not accept height parameter
  it.skip('should resolve unbondingDelegation', async () => {
    const params = data.unbondingDelegation.params as [any, any]
    const result = resolver.unbondingDelegation(...params)
    await expect(result).resolves.toEqual(data.unbondingDelegation.result)
  })

  it('should resolve unbondingDelegations', async () => {
    const params = data.unbondingDelegations.params as [any, any]
    const result = resolver.unbondingDelegations(...params)
    await expect(result).resolves.toEqual(data.unbondingDelegations.result)
  })

  it('should resolve validator', async () => {
    const result = resolver.validator(data.validator.params)
    await expect(result).resolves.toEqual(data.validator.result)
  })

  it('should resolve validators', async () => {
    const result = resolver.validators(data.validators.params)
    await expect(result).resolves.toEqual(data.validators.result)
  })
})
