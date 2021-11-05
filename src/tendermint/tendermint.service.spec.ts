import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { TendermintService } from './tendermint.service'

describe('TendermintService', () => {
  let service: TendermintService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TendermintService,
        {
          provide: getLoggerToken(TendermintService.name),
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

    service = module.get<TendermintService>(TendermintService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
