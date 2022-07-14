import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { parseSpecData } from '../../test/parse-spec'
import { TxResolver } from './tx.resolver'
import { TxService } from './tx.service'

describe('TxResolver', () => {
  let resolver: TxResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TxResolver, { provide: TxService, useValue: {} }],
    }).compile()

    resolver = module.get<TxResolver>(TxResolver)

    data = parseSpecData(__dirname + '/tx.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should resolve byHeight', async () => {
    const result = resolver.byHeight(data.byHeight.params)
    await expect(result).resolves.toEqual(data.byHeight.result)
  })

  it('should resolve txInfo', async () => {
    const result = resolver.txInfo(data.txInfo.params).then(JSON.stringify)
    await expect(result).resolves.toEqual(JSON.stringify(data.txInfo.result))
  })

  it('should resolve search', async () => {
    const result = resolver.search(data.search.params).then(JSON.stringify)
    await expect(result).resolves.toEqual(JSON.stringify(data.search.result))
  })
})
