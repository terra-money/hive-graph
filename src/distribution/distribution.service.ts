import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AccAddress, ValAddress } from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, DistributionParams } from 'src/common/models'
import { LcdService } from 'src/lcd/lcd.service'
import { Rewards, RewardItem, ValidatorRewards } from './models'

@Injectable()
export class DistributionService {
  constructor(
    @InjectPinoLogger(DistributionService.name)
    private readonly logger: PinoLogger,
    private readonly lcdService: LcdService,
  ) {}

  public async rewards(delegator: AccAddress, height?: number): Promise<Rewards> {
    try {
      const rewardsData = await this.lcdService.getLCDClient(height).distribution.rewards(delegator)

      return {
        rewards: Object.entries(rewardsData.rewards).map<RewardItem>(([validator, coins]) => ({
          validator_address: validator,
          reward: Coin.fromTerraCoins(coins),
        })),
        total: Coin.fromTerraCoins(rewardsData.total),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting delegator rewards for %s.', delegator)

      throw new LCDClientError(err)
    }
  }

  public async validatorRewards(validator: ValAddress, height?: number): Promise<ValidatorRewards> {
    try {
      const validatorRewardsData = await this.lcdService.getLCDClient(height).distribution.validatorRewards(validator)

      return {
        self_bond_rewards: Coin.fromTerraCoins(validatorRewardsData.self_bond_rewards),
        val_commission: Coin.fromTerraCoins(validatorRewardsData.val_commission),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting validator rewards for %s.', validator)

      throw new LCDClientError(err)
    }
  }

  public async withdrawAddress(delegator: AccAddress, height?: number): Promise<string> {
    try {
      return this.lcdService.getLCDClient(height).distribution.withdrawAddress(delegator)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the withdraw address for %s.', delegator)

      throw new LCDClientError(err)
    }
  }

  public async communityPool(height?: number): Promise<Coin[]> {
    try {
      const coins = await this.lcdService.getLCDClient(height).distribution.communityPool()

      return Coin.fromTerraCoins(coins)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current value of the community pool.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<DistributionParams> {
    try {
      const params = await this.lcdService.getLCDClient(height).distribution.parameters()

      return {
        community_tax: params.community_tax.toString(),
        base_proposer_reward: params.base_proposer_reward.toString(),
        bonus_proposer_reward: params.bonus_proposer_reward.toString(),
        withdraw_addr_enabled: params.withdraw_addr_enabled,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current distribution parameters.')

      throw new LCDClientError(err)
    }
  }
}
