import { Test, TestingModule } from '@nestjs/testing'
import { MsgauthResolver } from './msgauth.resolver'

describe('MsgauthResolver', () => {
  let resolver: MsgauthResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsgauthResolver],
    }).compile()

    resolver = module.get<MsgauthResolver>(MsgauthResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
