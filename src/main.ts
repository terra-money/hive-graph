import * as dotenv from 'dotenv'
dotenv.config()

import { Logger as NestLogger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as hpp from 'hpp'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
 let app: NestExpressApplication | NestFastifyApplication
  const webFramework: string = process.env.WEB_FRAMEWORK || "EXPRESS"
  const webFrameworkLogger: boolean = process.env.LOG_WEB_FRAMEWORK == 'true'

  if (webFramework == 'EXPRESS')
    app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: webFrameworkLogger })
  else if (webFramework == 'FASTIFY')
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: webFrameworkLogger }),
    )
  else throw new Error('Web framework ' + webFramework + ' is not supported.')

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

  await app.listen(port, '0.0.0.0')

  NestLogger.log(`App listening on port http://localhost:${port}/`)
  if (playground) {
    const subRoute = webFramework == "EXPRESS" ? "graphql" : "graphiql"
    NestLogger.log(`Playground at http://localhost:${port}/${subRoute}`)
  }
}

bootstrap()
