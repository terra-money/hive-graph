import { Injectable } from '@nestjs/common'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'
import { AccAddress, Account as TerraAccount } from 'nestjs-terra'
import { Account as LegacyTerraAccount } from 'nestjs-terra-legacy'
import { LCDClientError } from 'src/common/errors'
import { Coin, PublicKey } from 'src/common/models'
import { LcdService } from 'src/lcd/lcd.service'
import { Account, VestingAccount } from './models'

@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  public async accountInfo(address: AccAddress, height?: number): Promise<Account | VestingAccount> {
    try {
      const accountInfo = await this.lcdService.getLCDClient(height).auth.accountInfo(address)

      const account: Account = {
        address: accountInfo.address,
        coins: Coin.fromTerraCoins(accountInfo.coins),
        public_key: PublicKey.fromTerraKey(accountInfo.public_key),
        account_number: accountInfo.account_number,
        sequence: accountInfo.sequence,
      }

      if (accountInfo instanceof TerraAccount || accountInfo instanceof LegacyTerraAccount) {
        return account
      }

      return {
        ...account,
        original_vesting: Coin.fromTerraCoins(accountInfo.original_vesting),
        delegated_free: Coin.fromTerraCoins(accountInfo.delegated_free),
        delegated_vesting: Coin.fromTerraCoins(accountInfo.delegated_vesting),
        end_time: accountInfo.end_time,
        vesting_schedules: accountInfo.vesting_schedules.map((schedule) => ({
          denom: schedule.denom,
          schedules: schedule.schedules.map((item) => item.toData()),
        })),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting account info for %s.', address)

      throw new LCDClientError(err)
    }
  }
}
