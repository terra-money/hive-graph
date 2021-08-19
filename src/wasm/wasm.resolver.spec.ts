import { Test, TestingModule } from '@nestjs/testing'
import { WasmResolver } from './wasm.resolver'
import { WasmService } from './wasm.service'

describe('WasmResolver', () => {
  let resolver: WasmResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WasmResolver, { provide: WasmService, useValue: {} }],
    }).compile()

    resolver = module.get<WasmResolver>(WasmResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
