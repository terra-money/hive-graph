import { Test, TestingModule } from '@nestjs/testing'
import { parseSpecData } from '../../test/parse-spec'
import { AppModule } from '../app.module'
import { MintResolver } from './mint.resolver'
import { MintService } from './mint.service'

describe('MintResolver', () => {
  let resolver: MintResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [MintResolver, { provide: MintService, useValue: {} }],
    }).compile()

    resolver = module.get<MintResolver>(MintResolver)

    data = parseSpecData(__dirname + '/mint.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should resolve annualProvisions', async () => {
    const result = resolver.annualProvisions(data.annualProvisions.params)
    await expect(result).resolves.toEqual(data.annualProvisions.result)
  })

  it('should resolve inflation', async () => {
    const result = resolver.inflation(data.inflation.params)
    await expect(result).resolves.toEqual(data.inflation.result)
  })

  it('should resolve parameters', async () => {
    const result = resolver.parameters(data.parameters.params)
    await expect(result).resolves.toEqual(data.parameters.result)
  })
})
