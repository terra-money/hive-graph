import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { parseSpecData } from '../../test/parse-spec'
import { IbcResolver } from './ibc.resolver'
import { IbcService } from './ibc.service'

describe('IbcResolver', () => {
  let resolver: IbcResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [IbcResolver, { provide: IbcService, useValue: {} }],
    }).compile()

    resolver = module.get<IbcResolver>(IbcResolver)

    data = parseSpecData(__dirname + '/ibc.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should resolve parameters', async () => {
    const result = resolver.parameters(data.parameters.params)
    await expect(result).resolves.toEqual(data.parameters.result)
  })

  it('should resolve denomTrace', async () => {
    const result = resolver.denomTrace(data.denomTrace.params)
    await expect(result).resolves.toEqual(data.denomTrace.result)
  })

  it('should resolve denomTraces', async () => {
    const result = resolver.denomTraces({})
    await expect(result).resolves.toHaveProperty('denom_traces')
  })
})
