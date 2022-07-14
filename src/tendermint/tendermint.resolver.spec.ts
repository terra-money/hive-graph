import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { parseSpecData } from '../../test/parse-spec'
import { TendermintResolver } from './tendermint.resolver'
import { TendermintService } from './tendermint.service'

describe('TendermintResolver', () => {
  let resolver: TendermintResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TendermintResolver, { provide: TendermintService, useValue: {} }],
    }).compile()

    resolver = module.get<TendermintResolver>(TendermintResolver)

    data = parseSpecData(__dirname + '/tendermint.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should resolve blockInfo', async () => {
    const result = resolver.blockInfo(data.blockInfo.params)
    await expect(result).resolves.toEqual(data.blockInfo.result)
  })

  it('should resolve nodeInfo', async () => {
    const result = resolver.nodeInfo()
    await expect(result).resolves.toBeDefined()
  })

  it('should resolve syncing', async () => {
    const result = resolver.syncing().then((c) => typeof c === 'boolean')
    await expect(result).resolves.toEqual(true)
  })

  it('should resolve validatorSet', async () => {
    const result = resolver.validatorSet(data.validatorSet.params)
    await expect(result).resolves.toEqual(data.validatorSet.result)
  })
})
