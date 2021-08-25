import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { getTerraToken } from 'nestjs-terra'
import { getTerraToken as getLegacyTerraToken } from 'nestjs-terra-legacy'
import { LcdService } from './lcd.service'

describe('LcdService', () => {
  let service: LcdService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LcdService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => ''),
          },
        },
        {
          provide: getTerraToken(),
          useValue: {},
        },
        {
          provide: getLegacyTerraToken(),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<LcdService>(LcdService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
