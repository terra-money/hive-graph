import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { UtilsResolver } from './utils.resolver'
import { UtilsService } from './utils.service'

describe('UtilsResolver', () => {
  let resolver: UtilsResolver

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UtilsResolver, { provide: UtilsService, useValue: {} }],
    }).compile()

    resolver = module.get<UtilsResolver>(UtilsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should be resolve validatorsWithVotingPower', async () => {
    const result = await resolver.validatorsWithVotingPower()
    expect(result).toBeDefined()
    expect(result).not.toHaveLength(0)
    expect(result[0].proposer_priority).toBeDefined()
    expect(result[0].validator).toBeDefined()
    expect(result[0].voting_power).toBeDefined()
  })
})
