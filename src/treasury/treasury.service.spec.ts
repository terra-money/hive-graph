import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { TreasuryService } from './treasury.service'

describe('TreasuryService', () => {
  let service: TreasuryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TreasuryService,
        {
          provide: getLoggerToken(TreasuryService.name),
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

    service = module.get<TreasuryService>(TreasuryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
