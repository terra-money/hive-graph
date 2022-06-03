import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { SlashingParams } from 'src/common/models'
import { InjectLCDClient, LCDClient } from 'src/lcd'
import { SigningInfo } from './models'

@Injectable()
export class SlashingService {
  constructor(
    @InjectPinoLogger(SlashingService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async signingInfos(height?: number): Promise<SigningInfo[]> {
    try {
      const infos = await this.lcdService.slashing.signingInfos({ height })

      return infos.map<SigningInfo>((info) => ({
        address: info.address,
        start_height: info.start_height,
        index_offset: info.index_offset,
        jailed_until: info.jailed_until.toISOString(),
        tombstoned: info.tombstoned,
        missed_blocks_counter: info.missed_blocks_counter,
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting all signing info, or just the signing info of a particular validator.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<SlashingParams> {
    try {
      const params = await this.lcdService.slashing.parameters({ height })

      return {
        signed_blocks_window: params.signed_blocks_window,
        min_signed_per_window: params.min_signed_per_window.toString(),
        downtime_jail_duration: params.downtime_jail_duration.toString(),
        slash_fraction_double_sign: params.slash_fraction_double_sign.toString(),
        slash_fraction_downtime: params.slash_fraction_downtime.toString(),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current Slashing parameters.')

      throw new LCDClientError(err)
    }
  }
}
