import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { LCDClientError } from 'src/common/errors'
import { Coin, StakingParams, Validator } from 'src/common/models'
import {
  Delegation as TerraDelegation,
  InjectLCDClient,
  LCDClient,
  UnbondingDelegation as TerraUnbondingDelegation,
} from 'src/lcd'
import { Delegation, Redelegation, StakingPool, UnbondingDelegation, UnbondingDelegationEntry } from './models'

@Injectable()
export class StakingService {
  constructor(
    @InjectPinoLogger(StakingService.name)
    private readonly logger: PinoLogger,
    @InjectLCDClient()
    private readonly lcdService: LCDClient,
  ) {}

  private fromTerraDelegation(delegation: TerraDelegation): Delegation {
    return {
      delegator_address: delegation.delegator_address,
      validator_address: delegation.validator_address,
      shares: delegation.shares.toString(),
      balance: Coin.fromTerraCoin(delegation.balance),
    }
  }

  private fromTerraUnbondingDelegation(delegation: TerraUnbondingDelegation): UnbondingDelegation {
    return {
      delegator_address: delegation.delegator_address,
      validator_address: delegation.validator_address,
      entries: delegation.entries.map<UnbondingDelegationEntry>((entry) => ({
        initial_balance: entry.initial_balance.toString(),
        balance: entry.balance.toString(),
        creation_height: entry.creation_height,
        completion_time: entry.completion_time.toISOString(),
      })),
    }
  }

  public async delegations(delegator?: string, validator?: string, height?: number): Promise<Delegation[]> {
    try {
      const [delegations] = await this.lcdService.staking.delegations(delegator, validator, { height })

      return delegations.map<Delegation>(this.fromTerraDelegation)
    } catch (err) {
      this.logger.error({ err }, 'Error getting all delegations.')

      throw new LCDClientError(err)
    }
  }

  public async delegation(delegator: string, validator: string): Promise<Delegation | null> {
    try {
      const delegation = await this.lcdService.staking.delegation(delegator, validator)

      if (!delegation) {
        return null
      }

      return this.fromTerraDelegation(delegation)
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the delegation between a delegator %s and validator %s, if it exists.',
        delegator,
        validator,
      )

      throw new LCDClientError(err)
    }
  }

  public async unbondingDelegations(
    delegator?: string,
    validator?: string,
    height?: number,
  ): Promise<UnbondingDelegation[]> {
    try {
      const [delegations] = await this.lcdService.staking.unbondingDelegations(delegator, validator, { height })

      return delegations.map<UnbondingDelegation>(this.fromTerraUnbondingDelegation)
    } catch (err) {
      this.logger.error({ err }, 'Error getting all unbonding delegations.')

      throw new LCDClientError(err)
    }
  }

  public async unbondingDelegation(delegator?: string, validator?: string): Promise<UnbondingDelegation | null> {
    try {
      const delegation = await this.lcdService.staking.unbondingDelegation(delegator, validator)

      if (!delegation) {
        return null
      }

      return this.fromTerraUnbondingDelegation(delegation)
    } catch (err) {
      this.logger.error(
        { err },
        'Error getting the unbonding delegation between a delegator %s and validator %s.',
        delegator,
        validator,
      )

      throw new LCDClientError(err)
    }
  }

  public async redelegations(
    delegator: string,
    validatorSrc?: string,
    validatorDst?: string,
    height?: number,
  ): Promise<Redelegation[]> {
    try {
      const [redelegations] = await this.lcdService.staking.redelegations(delegator, validatorSrc, validatorDst, {
        height,
      })

      return redelegations.map<Redelegation>((redelegation) => ({
        delegator_address: redelegation.delegator_address,
        validator_src_address: redelegation.validator_src_address,
        validator_dst_address: redelegation.validator_dst_address,
        entries: redelegation.entries.map((entry) => ({
          initial_balance: entry.initial_balance.toString(),
          balance: entry.balance.toString(),
          shares_dst: entry.shares_dst.toString(),
          creation_height: entry.creation_height,
          completion_time: entry.completion_time.toISOString(),
        })),
      }))
    } catch (err) {
      this.logger.error({ err }, 'Error getting all redelegations.')

      throw new LCDClientError(err)
    }
  }

  public async bondedValidators(delegator: string, height?: number): Promise<Validator[]> {
    try {
      const [validators] = await this.lcdService.staking.bondedValidators(delegator, { height })

      return validators.map<Validator>(Validator.fromTerraValidator)
    } catch (err) {
      this.logger.error({ err }, 'Error getting all bonded validators for delegator %s.', delegator)

      throw new LCDClientError(err)
    }
  }

  public async validators(height?: number): Promise<Validator[]> {
    try {
      const [validators] = await this.lcdService.staking.validators({ height })

      return validators.map<Validator>(Validator.fromTerraValidator)
    } catch (err) {
      this.logger.error({ err }, 'Error getting all current registered validators.')

      throw new LCDClientError(err)
    }
  }

  public async validator(validator: string, height?: number): Promise<Validator | null> {
    try {
      const data = await this.lcdService.staking.validator(validator, { height })

      if (!data) {
        return null
      }

      return Validator.fromTerraValidator(data)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the validator information for validator %s.', validator)

      throw new LCDClientError(err)
    }
  }

  public async pool(height?: number): Promise<StakingPool> {
    try {
      const pool = await this.lcdService.staking.pool({ height })

      return {
        bonded_tokens: Coin.fromTerraCoin(pool.bonded_tokens),
        not_bonded_tokens: Coin.fromTerraCoin(pool.not_bonded_tokens),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current staking pool.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(height?: number): Promise<StakingParams> {
    try {
      const params = await this.lcdService.staking.parameters({ height })

      return {
        unbonding_time: params.unbonding_time.toString(),
        max_validators: params.max_validators,
        max_entries: params.max_entries,
        historical_entries: params.historical_entries,
        bond_denom: params.bond_denom,
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current Staking parameters.')

      throw new LCDClientError(err)
    }
  }
}
