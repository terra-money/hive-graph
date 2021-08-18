import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AccAddress, ValAddress } from 'nestjs-terra'
import { StakingParams, Validator } from 'src/common/models'
import { Delegation, Redelegation, Staking, StakingPool, UnbondingDelegation } from './models'
import { StakingService } from './staking.service'

@Resolver(Staking)
export class StakingResolver {
  constructor(private readonly stakingService: StakingService) {}

  @Query(() => Staking)
  public async staking(): Promise<Staking> {
    return {} as Staking
  }

  @ResolveField(() => [Delegation])
  public async delegations(
    @Args('delegator', { nullable: true }) delegator?: AccAddress,
    @Args('validator', { nullable: true }) validator?: ValAddress,
  ): Promise<Delegation[]> {
    return this.stakingService.delegations(delegator, validator)
  }

  @ResolveField(() => Delegation, { nullable: true })
  public async delegation(
    @Args('delegator') delegator: AccAddress,
    @Args('validator') validator: ValAddress,
  ): Promise<Delegation | null> {
    return this.stakingService.delegation(delegator, validator)
  }

  @ResolveField(() => [UnbondingDelegation])
  public async unbondingDelegations(
    @Args('delegator', { nullable: true }) delegator?: AccAddress,
    @Args('validator', { nullable: true }) validator?: ValAddress,
  ): Promise<UnbondingDelegation[]> {
    return this.stakingService.unbondingDelegations(delegator, validator)
  }

  @ResolveField(() => UnbondingDelegation, { nullable: true })
  public async unbondingDelegation(
    @Args('delegator', { nullable: true }) delegator?: AccAddress,
    @Args('validator', { nullable: true }) validator?: ValAddress,
  ): Promise<UnbondingDelegation | null> {
    return this.stakingService.unbondingDelegation(delegator, validator)
  }

  @ResolveField(() => [Redelegation])
  public async redelegations(
    @Args('delegator', { nullable: true }) delegator?: AccAddress,
    @Args('validatorSrc', { nullable: true }) validatorSrc?: ValAddress,
    @Args('validatorDst', { nullable: true }) validatorDst?: ValAddress,
  ): Promise<Redelegation[]> {
    return this.stakingService.redelegations(delegator, validatorSrc, validatorDst)
  }

  @ResolveField(() => [Validator])
  public async bondedValidators(@Args('delegator') delegator: AccAddress): Promise<Validator[]> {
    return this.stakingService.bondedValidators(delegator)
  }

  @ResolveField(() => [Validator])
  public async validators(): Promise<Validator[]> {
    return this.stakingService.validators()
  }

  @ResolveField(() => Validator, { nullable: true })
  public async validator(@Args('validator') validator: ValAddress): Promise<Validator | null> {
    return this.stakingService.validator(validator)
  }

  @ResolveField(() => StakingPool)
  public async pool(): Promise<StakingPool> {
    return this.stakingService.pool()
  }

  @ResolveField(() => StakingParams)
  public async parameters(): Promise<StakingParams> {
    return this.stakingService.parameters()
  }
}
