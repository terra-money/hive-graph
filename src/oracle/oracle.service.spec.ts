import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LcdService } from 'src/lcd/lcd.service'
import { OracleService } from './oracle.service'

describe('OracleService', () => {
  let service: OracleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OracleService,
        {
          provide: getLoggerToken(OracleService.name),
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

    service = module.get<OracleService>(OracleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
