import { Module } from '@nestjs/common'
import { LcdModule } from 'src/lcd/lcd.module'
import { WasmResolver } from './wasm.resolver'
import { WasmService } from './wasm.service'

@Module({
  imports: [LcdModule],
  providers: [WasmService, WasmResolver],
})
export class WasmModule {}
