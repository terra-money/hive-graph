import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AccAddress, InjectTerraLCDClient, SendAuthorization, TerraLCDClient } from 'nestjs-terra'
import { Coin } from 'src/common/models'
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

      return grants.map<AuthorizationGrant>((grant) => {
        const expiration = grant.expiration.toISOString()

        if (grant.authorization instanceof SendAuthorization) {
          return {
            expiration,
            authorization: {
              spend_limit: Coin.fromTerraCoins(grant.authorization.spend_limit),
            },
          }
        }

        return {
          expiration,
          authorization: {
            grant_msg_type: grant.authorization.grant_msg_type,
          },
        }
      })
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the message authorization grants for a specific granter %s and grantee %s.',
        granter,
        grantee,
      )

      throw err
    }
  }
}
