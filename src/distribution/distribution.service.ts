import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { AccAddress, InjectTerraLCDClient, TerraLCDClient, ValAddress } from 'nestjs-terra'
import { Coin } from 'src/common/models'
import { Rewards, RewardItem, ValidatorRewards, DistributionParams } from './models'

@Injectable()
export class DistributionService {
  constructor(
    @InjectPinoLogger(DistributionService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
  ) {}

  public async rewards(delegator: AccAddress): Promise<Rewards> {
    try {
      const rewardsData = await this.terraClient.distribution.rewards(delegator)

      return {
        rewards: Object.entries(rewardsData.rewards).map<RewardItem>(([validator, coins]) => ({
          validator_address: validator,
          reward: Coin.fromTerraCoins(coins),
        })),
        total: Coin.fromTerraCoins(rewardsData.total),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting delegator rewards for %s.', delegator)

      throw err
    }
  }

  public async validatorRewards(validator: ValAddress): Promise<ValidatorRewards> {
    try {
      const validatorRewardsData = await this.terraClient.distribution.validatorRewards(validator)

      return {
        self_bond_rewards: Coin.fromTerraCoins(validatorRewardsData.self_bond_rewards),
        val_commission: Coin.fromTerraCoins(validatorRewardsData.val_commission),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting validator rewards for %s.', validator)

      throw err
    }
  }

  public async withdrawAddress(delegator: AccAddress): Promise<string> {
    try {
      return this.terraClient.distribution.withdrawAddress(delegator)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the withdraw address for %s.', delegator)

      throw err
    }
  }

  public async communityPool(): Promise<Coin[]> {
    try {
      const coins = await this.terraClient.distribution.communityPool()

      return Coin.fromTerraCoins(coins)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current value of the community pool.')

      throw err
    }
  }

  public async parameters(): Promise<DistributionParams> {
    try {
      const params = await this.terraClient.distribution.parameters()

      return {
        community_tax: params.community_tax.toString(),
        base_proposer_reward: params.base_proposer_reward.toString(),
        bonus_proposer_reward: params.bonus_proposer_reward.toString(),
        withdraw_addr_enabled: params.withdraw_addr_enabled,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current distribution parameters.')

      throw err
    }
  }
}
