import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LCD_MODULE_TOKEN } from 'src/lcd/lcd.constant'
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
          provide: LCD_MODULE_TOKEN,
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
