import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { parseSpecData } from '../../test/parse-spec'
import { MsgauthResolver } from './msgauth.resolver'
import { MsgauthService } from './msgauth.service'

describe('MsgauthResolver', () => {
  let resolver: MsgauthResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],

      providers: [MsgauthResolver, { provide: MsgauthService, useValue: {} }],
    }).compile()

    resolver = module.get<MsgauthResolver>(MsgauthResolver)

    data = parseSpecData(__dirname + '/msgauth.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should resolve grants GenericAuthorization', async () => {
    const result = resolver.grants(data.grants_generic.params)
    await expect(result).resolves.toEqual(data.grants_generic.result)
  })

  it('should resolve grants StakeAuthorization', async () => {
    const result = resolver.grants(data.grants_stake.params)
    await expect(result).resolves.toEqual(data.grants_stake.result)
  })

  // TODO: find send authorization grants tx
  it.skip('should resolve grants SendAuthorization', () => {
    expect(1).toBe(1)
  })
})
