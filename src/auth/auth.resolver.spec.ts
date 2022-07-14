import { Test, TestingModule } from '@nestjs/testing'
import { parseSpecData } from '../../test/parse-spec'
import { AppModule } from '../app.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

describe('AuthResolver', () => {
  let resolver: AuthResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AuthResolver, { provide: AuthService, useValue: {} }],
    }).compile()

    resolver = module.get<AuthResolver>(AuthResolver)

    data = parseSpecData(__dirname + '/auth.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
    expect(data.accountInfo).toBeDefined()
  })

  it('should resolve accountInfo', async () => {
    const result = resolver.accountInfo(data.accountInfo.params)
    await expect(result).resolves.toEqual(data.accountInfo.result)
  })
})
