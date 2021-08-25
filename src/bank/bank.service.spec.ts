import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LcdService } from 'src/lcd/lcd.service'
import { BankService } from './bank.service'

describe('BankService', () => {
  let service: BankService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        {
          provide: getLoggerToken(BankService.name),
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

    service = module.get<BankService>(BankService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
