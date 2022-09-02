import dotenv from 'dotenv'
import autoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import cors from '@fastify/cors'
import Fastify from 'fastify'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fastify = Fastify({
  logger: true,
  prettyPrint: true
})

fastify.register(autoLoad, {
  dir: join(__dirname, 'routes'),
  ignorePattern: /.*(test|spec).js/,
  maxdepth: 2
})
fastify.register(cors, {})

export default async function server() {
  const port = process.env.PORT || 5001
  try {
    await fastify.listen(port, '0.0.0.0')
  } catch (err) {
    console.error(err)
    throw err
    process.exit(1)
  }
}
server()
