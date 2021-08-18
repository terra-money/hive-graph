import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import {
  AccAddress,
  InjectTerraLCDClient,
  TerraLCDClient,
  ValAddress,
  Delegation as TerraDelegation,
  UnbondingDelegation as TerraUnbondingDelegation,
} from 'nestjs-terra'
import { LCDClientError } from 'src/common/errors'
import { Coin, StakingParams, Validator } from 'src/common/models'
import { Delegation, Redelegation, StakingPool, UnbondingDelegation, UnbondingDelegationEntry } from './models'

@Injectable()
export class StakingService {
  constructor(
    @InjectPinoLogger(StakingService.name)
    private readonly logger: PinoLogger,
    @InjectTerraLCDClient()
    private readonly terraClient: TerraLCDClient,
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
      validator_address: delegation.delegator_address,
      entries: delegation.entries.map<UnbondingDelegationEntry>((entry) => ({
        initial_balance: entry.initial_balance.toString(),
        balance: entry.balance.toString(),
        creation_height: entry.creation_height,
        completion_time: entry.completion_time.toISOString(),
      })),
    }
  }

  public async delegations(delegator?: AccAddress, validator?: ValAddress): Promise<Delegation[]> {
    try {
      const delegations = await this.terraClient.staking.delegations(delegator, validator)

      return delegations.map<Delegation>(this.fromTerraDelegation)
    } catch (err) {
      this.logger.error({ err }, 'Error getting all delegations.')

      throw new LCDClientError(err)
    }
  }

  public async delegation(delegator: AccAddress, validator: ValAddress): Promise<Delegation | null> {
    try {
      const delegation = await this.terraClient.staking.delegation(delegator, validator)

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

  public async unbondingDelegations(delegator?: AccAddress, validator?: ValAddress): Promise<UnbondingDelegation[]> {
    try {
      const delegations = await this.terraClient.staking.unbondingDelegations(delegator, validator)

      return delegations.map<UnbondingDelegation>(this.fromTerraUnbondingDelegation)
    } catch (err) {
      this.logger.error({ err }, 'Error getting all unbonding delegations.')

      throw new LCDClientError(err)
    }
  }

  public async unbondingDelegation(
    delegator?: AccAddress,
    validator?: ValAddress,
  ): Promise<UnbondingDelegation | null> {
    try {
      const delegation = await this.terraClient.staking.unbondingDelegation(delegator, validator)

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
    delegator?: AccAddress,
    validatorSrc?: ValAddress,
    validatorDst?: ValAddress,
  ): Promise<Redelegation[]> {
    try {
      const redelegations = await this.terraClient.staking.redelegations(delegator, validatorSrc, validatorDst)

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

  public async bondedValidators(delegator: AccAddress): Promise<Validator[]> {
    try {
      const validators = await this.terraClient.staking.bondedValidators(delegator)

      return validators.map<Validator>(Validator.fromTerraValidator)
    } catch (err) {
      this.logger.error({ err }, 'Error getting all bonded validators for delegator %s.', delegator)

      throw new LCDClientError(err)
    }
  }

  public async validators(): Promise<Validator[]> {
    try {
      const validators = await this.terraClient.staking.validators()

      return validators.map<Validator>(Validator.fromTerraValidator)
    } catch (err) {
      this.logger.error({ err }, 'Error getting all current registered validators.')

      throw new LCDClientError(err)
    }
  }

  public async validator(validator: ValAddress): Promise<Validator | null> {
    try {
      const data = await this.terraClient.staking.validator(validator)

      if (!data) {
        return null
      }

      return Validator.fromTerraValidator(data)
    } catch (err) {
      this.logger.error({ err }, 'Error getting the validator information for validator %s.', validator)

      throw new LCDClientError(err)
    }
  }

  public async pool(): Promise<StakingPool> {
    try {
      const pool = await this.terraClient.staking.pool()

      return {
        bonded_tokens: Coin.fromTerraCoin(pool.bonded_tokens),
        not_bonded_tokens: Coin.fromTerraCoin(pool.not_bonded_tokens),
      }
    } catch (err) {
      this.logger.error({ err }, 'Error getting the current staking pool.')

      throw new LCDClientError(err)
    }
  }

  public async parameters(): Promise<StakingParams> {
    try {
      const params = await this.terraClient.staking.parameters()

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
