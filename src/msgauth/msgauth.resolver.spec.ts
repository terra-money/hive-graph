import { Test, TestingModule } from '@nestjs/testing'
import { MsgauthResolver } from './msgauth.resolver'
import { MsgauthService } from './msgauth.service'

describe('MsgauthResolver', () => {
  let resolver: MsgauthResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsgauthResolver, { provide: MsgauthService, useValue: {} }],
    }).compile()

    resolver = module.get<MsgauthResolver>(MsgauthResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
