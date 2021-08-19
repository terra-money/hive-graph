import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { WasmService } from './wasm.service'

describe('WasmService', () => {
  let service: WasmService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WasmService,
        {
          provide: getLoggerToken(WasmService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getTerraToken(),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<WasmService>(WasmService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
