import { Module, DynamicModule, Provider, ModuleMetadata, Global } from '@nestjs/common'
import { LCDClient, LCDClientConfig } from '@terra-money/terra.js'
import { defer, lastValueFrom } from 'rxjs'
import { GAS_ADJUSTMENT, GAS_PRICES, LCD_MODULE_TOKEN, LCD_MODULE_OPTIONS_TOKEN } from './lcd.constant'

export interface LCDModuleOptions extends LCDClientConfig, Record<string, any> {}
export interface LCDModuleAsyncOptions extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (...args: any[]) => LCDModuleOptions | Promise<LCDModuleOptions>
  inject?: any[]
}

@Global()
@Module({})
export class LCDModule {
  static forRoot(options: LCDModuleOptions): DynamicModule {
    const provider = {
      provide: LCD_MODULE_TOKEN,
      useFactory: async (): Promise<LCDClient> => {
        return await lastValueFrom(defer(() => createLCDClient(options)))
      },
    }
    return {
      module: LCDModule,
      providers: [provider],
      exports: [provider],
    }
  }

  static forRootAsync(options: LCDModuleAsyncOptions): DynamicModule {
    const asyncProvider = this.createAsyncProvider()
    const asyncOptionsProvider = this.createAsyncOptionsProvider(options)

    return {
      module: LCDModule,
      imports: options.imports,
      providers: [asyncOptionsProvider, asyncProvider, ...(options.providers || [])],
      exports: [asyncProvider],
    }
  }

  static createAsyncProvider(): Provider {
    return {
      provide: LCD_MODULE_TOKEN,
      useFactory: async (options: LCDModuleOptions): Promise<LCDClient> => {
        return await lastValueFrom(defer(() => createLCDClient(options)))
      },
      inject: [LCD_MODULE_OPTIONS_TOKEN],
    }
  }

  static createAsyncOptionsProvider(options: LCDModuleAsyncOptions): Provider {
    return {
      provide: LCD_MODULE_OPTIONS_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject || [],
    }
  }
}

async function createLCDClient(options: LCDModuleOptions): Promise<LCDClient> {
  const { URL, chainID, gasPrices = GAS_PRICES, gasAdjustment = GAS_ADJUSTMENT } = options

  const client = new LCDClient({
    URL,
    chainID,
    gasPrices,
    gasAdjustment,
    isClassic: false,
  })

  return client
}
