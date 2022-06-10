import { Injectable } from '@nestjs/common'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { Coin, PublicKey } from 'src/common/models'
import { AccAddress, InjectLCDClient, LCDClient } from 'src/lcd'
import * as lcd from 'src/lcd'
import { Account, LazyGradedVestingAccount } from './models'

@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  public async accountInfo(address: AccAddress, height?: number): Promise<Account | LazyGradedVestingAccount> {
    try {
      const accountInfo = await this.lcdService.auth.accountInfo(address, { height })
      const terraAccount = lcd.Account.fromAmino(accountInfo.toAmino())

      if (terraAccount instanceof lcd.BaseAccount) {
        return {
          address: terraAccount.address,
          public_key: PublicKey.fromTerraKey(terraAccount.public_key),
          account_number: terraAccount.account_number,
          sequence: terraAccount.sequence,
        }
      }

      const base_vesting_account =
        terraAccount instanceof lcd.BaseVestingAccount ? terraAccount : terraAccount.base_vesting_account
      const hasVestingSchedule = terraAccount instanceof lcd.LazyGradedVestingAccount

      return {
        address: base_vesting_account.base_account.address,
        public_key: PublicKey.fromTerraKey(base_vesting_account.base_account.public_key),
        account_number: base_vesting_account.base_account.account_number,
        sequence: base_vesting_account.base_account.sequence,
        original_vesting: Coin.fromTerraCoins(base_vesting_account.original_vesting),
        delegated_free: Coin.fromTerraCoins(base_vesting_account.delegated_free),
        delegated_vesting: Coin.fromTerraCoins(base_vesting_account.delegated_vesting),
        end_time: base_vesting_account.end_time,
        ...(hasVestingSchedule && {
          vesting_schedules: terraAccount.vesting_schedules.map((schedule) => ({
            denom: schedule.denom,
            schedules: schedule.schedules.map((item) => item.toData()),
          })),
        }),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting account info for %s.', address)

      throw new LCDClientError(err)
    }
  }
}
