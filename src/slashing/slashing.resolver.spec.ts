import { Test, TestingModule } from '@nestjs/testing'
import { parseSpecData } from '../../test/parse-spec'
import { AppModule } from '../app.module'
import { SlashingResolver } from './slashing.resolver'
import { SlashingService } from './slashing.service'

describe('SlashingResolver', () => {
  let resolver: SlashingResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [SlashingResolver, { provide: SlashingService, useValue: {} }],
    }).compile()

    resolver = module.get<SlashingResolver>(SlashingResolver)

    data = parseSpecData(__dirname + '/slashing.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
    expect(data.parameters).toBeDefined()
    expect(data.signingInfos).toBeDefined()
  })

  it('should resolve parameters', async () => {
    const result = resolver.parameters(data.parameters.params)
    await expect(result).resolves.toEqual(data.parameters.result)
  })

  it('should resolve signingInfos', async () => {
    const result = resolver.signingInfos(data.signingInfos.params)
    await expect(result).resolves.toEqual(data.signingInfos.result)
  })
})
