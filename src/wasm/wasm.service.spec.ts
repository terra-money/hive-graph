import { Test, TestingModule } from '@nestjs/testing'
import { WasmService } from './wasm.service'

describe('WasmService', () => {
  let service: WasmService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WasmService],
    }).compile()

    service = module.get<WasmService>(WasmService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
