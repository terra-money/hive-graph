declare global {
  namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string
        PORT: string
        LOG_NAME: string
        LOG_LEVEL: string
        GRAPHQL_DEBUG: string
        GRAPHQL_PLAYGROUND: string
        GRAPHQL_SORT_SCHEMA: string
        GRAPHQL_INTROSPECTION: string
        LCD_URL: string
        CHAIN_ID: string
        NUM_PROXY_CONCURRENCY: string
    }
  }
}

export {}