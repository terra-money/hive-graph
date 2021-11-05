import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { MintService } from './mint.service'

describe('MintService', () => {
  let service: MintService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MintService,
        {
          provide: getLoggerToken(MintService.name),
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

    service = module.get<MintService>(MintService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
