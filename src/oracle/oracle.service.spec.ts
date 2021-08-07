import { Test, TestingModule } from '@nestjs/testing'
import { OracleService } from './oracle.service'

describe('OracleService', () => {
  let service: OracleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OracleService],
    }).compile()

    service = module.get<OracleService>(OracleService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
