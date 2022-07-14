import { Test, TestingModule } from '@nestjs/testing'
import { AppResolver } from './app.resolver'

describe('AppResolver', () => {
  let resolver: AppResolver

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppResolver],
    }).compile()

    resolver = module.get<AppResolver>(AppResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should ping pong', () => {
    const result = resolver.ping()
    expect(result).toEqual('pong')
  })
})
