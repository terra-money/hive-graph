import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { IbcService } from './ibc.service'

describe('IbcService', () => {
  let service: IbcService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IbcService,
        {
          provide: getLoggerToken(IbcService.name),
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

    service = module.get<IbcService>(IbcService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
