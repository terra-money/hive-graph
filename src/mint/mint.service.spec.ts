import { Test, TestingModule } from '@nestjs/testing'
import { MintService } from './mint.service'

describe('MintService', () => {
  let service: MintService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintService],
    }).compile()

    service = module.get<MintService>(MintService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
