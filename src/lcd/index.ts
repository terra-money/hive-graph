import { Inject } from '@nestjs/common'
import { LCD_MODULE_TOKEN } from './lcd.constant'

export { LCDModule } from './lcd.module'
export const InjectLCDClient = () => Inject(LCD_MODULE_TOKEN)
export * from '@terra-money/terra.js'
