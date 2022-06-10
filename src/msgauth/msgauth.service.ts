import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { Authorization } from 'src/common/models'
import { InjectLCDClient, LCDClient } from 'src/lcd'
import { AuthorizationGrant } from './models'

@Injectable()
export class MsgauthService {
  constructor(
    @InjectPinoLogger(MsgauthService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async grants(
    granter: string,
    grantee: string,
    msgType?: string,
    height?: number,
  ): Promise<AuthorizationGrant[]> {
    try {
      const [grants] = await this.lcdService.authz.grants(granter, grantee, msgType, { height })

      return grants.map<AuthorizationGrant>((grant) => ({
        expiration: grant.expiration.toISOString(),
        authorization: Authorization.fromTerra(grant.authorization),
      }))
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the message authorization grants for a specific granter %s and grantee %s.',
        granter,
        grantee,
      )

      throw new LCDClientError(err)
    }
  }
}
