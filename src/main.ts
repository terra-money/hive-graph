import { Logger as NestLogger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as hpp from 'hpp'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true })
  const configService = app.get(ConfigService)
  const port = parseInt(configService.get<string>('PORT', ''), 10)
  const env = configService.get<string>('NODE_ENV', 'production')
  const playground = configService.get<string>('GRAPHQL_PLAYGROUND', 'false') === 'true'
  const helmetOptions = {
    frameguard: false,
    dnsPrefetchControl: {
      allow: true,
    },
    contentSecurityPolicy: env === 'production' && !playground ? undefined : false,
  }

  app.useLogger(app.get(Logger))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  )
  app.use([compression(), helmet(helmetOptions), hpp()])

  await app.listen(port)

  NestLogger.log(`App listening on port http://localhost:${port}/`)
}

bootstrap()
