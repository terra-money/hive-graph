import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LCD_MODULE_TOKEN } from 'src/lcd/lcd.constant'
import { MsgauthService } from './msgauth.service'

describe('MsgauthService', () => {
  let service: MsgauthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MsgauthService,
        {
          provide: getLoggerToken(MsgauthService.name),
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

    service = module.get<MsgauthService>(MsgauthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
