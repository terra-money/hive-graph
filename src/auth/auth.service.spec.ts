import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LCD_MODULE_TOKEN } from 'src/lcd/lcd.constant'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getLoggerToken(AuthService.name),
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

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
