import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
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
          provide: getTerraToken(),
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
