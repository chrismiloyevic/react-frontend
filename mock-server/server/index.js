import * as http from 'http'
import Koa from 'koa'
import mount from 'koa-mount'
import logger from 'koa-logger'
import compress from 'koa-compress'
import { contentSecurityPolicy } from 'koa-helmet'
import { Some, None } from '@es2/option-result'

import { api } from './api'


function createApp() {
  const app = new Koa()

  app.use(compress())
  app.use(logger())

  app.use(mount('/api', api))

  app.use(contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  }))

  app.use((ctx) => {
    ctx.body = {
      ok: false,
      error: 'route_not_found',
      status: 404,
    }
  })

  return app
}

export async function main() {
  const app = createApp()
  const server = http.createServer(app.callback())

  server.listen(process.env.PORT || 3000)
  server.on('error', (error) => {
    throw error
  })
  server.on('listening', () => {
    const address = server.address()

    // eslint-disable-next-line no-console
    console.log(`\n\\> Listening on http://localhost:${address.port}\n`)
  })
}
