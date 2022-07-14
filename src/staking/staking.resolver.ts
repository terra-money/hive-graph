import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { GetOptionalValidatorArgs, GetOptionalDelegatorArgs } from 'src/common/arguments/optional.args'
import { GetRequiredDelegatorArgs, GetRequiredValidatorArgs } from 'src/common/arguments/required.args'
import { StakingParams, Validator } from 'src/common/models'
import { Delegation, Redelegation, Staking, StakingPool, UnbondingDelegation } from './models'
import { GetStakingArgs } from './staking.args'
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
    @Args() delArgs: GetOptionalDelegatorArgs,
    @Args() valArgs: GetOptionalValidatorArgs,
  ): Promise<Delegation[]> {
    return this.stakingService.delegations(delArgs.delegator, valArgs.validator, valArgs.height)
  }

  @ResolveField(() => Delegation, { nullable: true })
  public async delegation(
    @Args() delArgs: GetRequiredDelegatorArgs,
    @Args() valArgs: GetRequiredValidatorArgs,
  ): Promise<Delegation | null> {
    return this.stakingService.delegation(delArgs.delegator, valArgs.validator)
  }

  @ResolveField(() => [UnbondingDelegation])
  public async unbondingDelegations(
    @Args() delArgs: GetOptionalDelegatorArgs,
    @Args() valArgs: GetOptionalValidatorArgs,
  ): Promise<UnbondingDelegation[]> {
    return this.stakingService.unbondingDelegations(delArgs.delegator, valArgs.validator, valArgs.height)
  }

  @ResolveField(() => UnbondingDelegation, { nullable: true })
  public async unbondingDelegation(
    @Args() delArgs: GetOptionalDelegatorArgs,
    @Args() valArgs: GetOptionalValidatorArgs,
  ): Promise<UnbondingDelegation | null> {
    return this.stakingService.unbondingDelegation(delArgs.delegator, valArgs.validator)
  }

  @ResolveField(() => [Redelegation])
  public async redelegations(@Args() args: GetStakingArgs): Promise<Redelegation[]> {
    return this.stakingService.redelegations(args.delegator, args.validatorSrc, args.validatorDst, args.height)
  }

  @ResolveField(() => [Validator])
  public async bondedValidators(
    @Args() args: GetRequiredDelegatorArgs,
    @Args() basArgs: GetBaseArgs,
  ): Promise<Validator[]> {
    return this.stakingService.bondedValidators(args.delegator, basArgs.height)
  }

  @ResolveField(() => [Validator])
  public async validators(@Args() args: GetBaseArgs): Promise<Validator[]> {
    return this.stakingService.validators(args.height)
  }

  @ResolveField(() => Validator, { nullable: true })
  public async validator(@Args() args: GetRequiredValidatorArgs): Promise<Validator | null> {
    return this.stakingService.validator(args.validator, args.height)
  }

  @ResolveField(() => StakingPool)
  public async pool(@Args() args: GetBaseArgs): Promise<StakingPool> {
    return this.stakingService.pool(args.height)
  }

  @ResolveField(() => StakingParams)
  public async parameters(@Args() args: GetBaseArgs): Promise<StakingParams> {
    return this.stakingService.parameters(args.height)
  }
}
