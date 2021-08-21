import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AccAddress, InjectTerraLCDClient, TerraLCDClient } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Authorization } from 'src/common/models'
import { AuthorizationGrant } from './models'

@Injectable()
export class MsgauthService {
  constructor(
    @InjectPinoLogger(MsgauthService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async grants(granter: AccAddress, grantee: AccAddress, msgType?: string): Promise<AuthorizationGrant[]> {
    try {
      const grants = await this.terraClient.msgauth.grants(granter, grantee, msgType)

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
