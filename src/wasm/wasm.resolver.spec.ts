import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { parseSpecData } from '../../test/parse-spec'
import { WasmResolver } from './wasm.resolver'
import { WasmService } from './wasm.service'

describe('WasmResolver', () => {
  let resolver: WasmResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [WasmResolver, { provide: WasmService, useValue: {} }],
    }).compile()

    resolver = module.get<WasmResolver>(WasmResolver)

    data = parseSpecData(__dirname + '/wasm.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.skip('should resolve codeInfo', async () => {
    const result = resolver.codeInfo(data.codeInfo.params)
    await expect(result).resolves.toEqual(data.codeInfo.result)
  })

  it('should resolve contractInfo', async () => {
    const params = data.contractInfo.params as [any, any]
    const result = resolver.contractInfo(...params)
    await expect(result).resolves.toEqual(data.contractInfo.result)
  })

  it('should resolve contractQuery', async () => {
    const params = data.contractQuery.params as [any, any, any]
    const result = resolver.contractQuery(...params)
    await expect(result).resolves.toEqual(data.contractQuery.result)
  })
})
