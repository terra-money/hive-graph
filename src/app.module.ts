import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
// import { ThrottlerModule } from '@nestjs/throttler'
import { createValidation } from 'graphql-no-alias'
import { LoggerModule } from 'nestjs-pino'
import { join } from 'path'
import pino from 'pino'
import { AnythingScalar } from './anything.scalar'
import { AppResolver } from './app.resolver'
import { AuthModule } from './auth/auth.module'
import { BankModule } from './bank/bank.module'
import { registerEnums } from './common/enums'
import { DistributionModule } from './distribution/distribution.module'
import { validate } from './env.validation'
import { GovModule } from './gov/gov.module'
import { IbcModule } from './ibc/ibc.module'
import { LCDModule } from './lcd'
import { MintModule } from './mint/mint.module'
import { MsgauthModule } from './msgauth/msgauth.module'
import { SlashingModule } from './slashing/slashing.module'
import { StakingModule } from './staking/staking.module'
import { TendermintModule } from './tendermint/tendermint.module'
import { TxModule } from './tx/tx.module'
import { UtilsModule } from './utils/utils.module'
import { WasmModule } from './wasm/wasm.module'

const permissions = {
  Query: {
    '*': 50, // default value for all queries
  },
  Mutation: {
    '*': 50, //default value for all mutations
  },
}
const { validation } = createValidation({ permissions })

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, validate }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const pinoHttp: pino.LoggerOptions = {
          name: config.get<string>('LOG_NAME'),
          level: config.get<string>('LOG_LEVEL'),
          prettyPrint: false,
        }

        if (config.get<string>('NODE_ENV') !== 'production') {
          pinoHttp.prettyPrint = {
            colorize: true,
            singleLine: true,
            translateTime: true,
          }
        }

        return { pinoHttp }
      },
    }),
    //     ThrottlerModule.forRootAsync({
    //       imports: [ConfigModule],
    //       inject: [ConfigService],
    //       useFactory: (config: ConfigService) => ({
    //         ttl: parseInt(config.get<string>('THROTTLE_TTL', '60'), 10),
    //         limit: parseInt(config.get<string>('THROTTLE_LIMIT', '20'), 10),
    //       }),
    //     }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        registerEnums() // register enums graphql

        return {
          validationRules: [validation],
          sortSchema: config.get<string>('GRAPHQL_SORT_SCHEMA', 'true') === 'true',
          debug: config.get<string>('GRAPHQL_DEBUG', 'false') === 'true',
          playground: config.get<string>('GRAPHQL_PLAYGROUND', 'false') === 'true',
          autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
          introspection: config.get<string>('GRAPHQL_INTROSPECTION', 'true') === 'true',
        }
      },
    }),
    LCDModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const URL = config.get<string>('LCD_URL')
        const chainID = config.get<string>('CHAIN_ID')

        if (!URL || !chainID) {
          throw new Error('Invalid LCD_URL or CHAIN_ID variables.')
        }

        return {
          URL,
          chainID,
        }
      },
    }),
    AuthModule,
    BankModule,
    DistributionModule,
    GovModule,
    MintModule,
    MsgauthModule,
    SlashingModule,
    StakingModule,
    TendermintModule,
    WasmModule,
    TxModule,
    UtilsModule,
    IbcModule,
  ],
  providers: [AppResolver, AnythingScalar],
})
export class AppModule {}
