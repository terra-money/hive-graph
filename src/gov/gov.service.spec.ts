import { Test, TestingModule } from '@nestjs/testing'
import { GovService } from './gov.service'

describe('GovService', () => {
  let service: GovService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GovService],
    }).compile()

    service = module.get<GovService>(GovService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
