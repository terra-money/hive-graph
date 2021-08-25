import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LcdService } from 'src/lcd/lcd.service'
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
          provide: LcdService,
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
