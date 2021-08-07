import { Test, TestingModule } from '@nestjs/testing'
import { MsgauthService } from './msgauth.service'

describe('MsgauthService', () => {
  let service: MsgauthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsgauthService],
    }).compile()

    service = module.get<MsgauthService>(MsgauthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
