import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LcdService } from 'src/lcd/lcd.service'
import { UtilsService } from './utils.service'

describe('UtilsService', () => {
  let service: UtilsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilsService,
        {
          provide: getLoggerToken(UtilsService.name),
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

    service = module.get<UtilsService>(UtilsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
