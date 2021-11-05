import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { GovService } from './gov.service'

describe('GovService', () => {
  let service: GovService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GovService,
        {
          provide: getLoggerToken(GovService.name),
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

    service = module.get<GovService>(GovService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
