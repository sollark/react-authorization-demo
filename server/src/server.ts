import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './apiRouter.js'
import { config } from './config/config.js'
import collectVisitorInfo from './middleware/collectVisitorInfo.js'
import errorHandler from './middleware/errorHandler.js'
import requestLimit from './middleware/requestLimit.js'
import setHeaders from './middleware/setHeaders.js'
import { connectMongo } from './mongodb/connect.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const server = http.createServer(app)

// CORS
if (config.env === 'development') {
  app.use(
    cors({
      credentials: true,
      origin: config.server.origins,
    })
  )
}

// Production middlewares
if (config.env === 'production') {
  app.use(setHeaders)
  app.use(requestLimit)
}

// Middlewares
app.use(collectVisitorInfo)
app.use(compression())
app.use(bodyParser.json())

// API router
app.use('/api', router)

// Serve i18n files
app.use('/i18n', express.static(path.join(__dirname, 'public/i18n')))

// Serve static files for development (vite server)
if (config.env === 'development') {
  app.use(
    '/',
    createProxyMiddleware({
      target: config.server.proxy,
      changeOrigin: true,
      ws: true, // proxy websockets
    })
  )
}

// Serve static files for production
if (config.env === 'production') {
  const staticPath = path.join(__dirname, 'public')
  app.use(express.static(staticPath))
}

// Serve index.html for all other routes
const publicPath = path.join(__dirname, 'public', 'index.html')
const clientRoute = '/**'
app.get(clientRoute, (req, res, next) => res.sendFile(publicPath))

// 404
app.use(clientRoute, (req, res, next) => {
  const error = new Error(`${req.method} ${req.originalUrl} not found!`)
  next(error)
})

// Error handler
app.use(errorHandler)

// Start server
server.listen(config.server.port, () =>
  console.log(`Server is up and running on port ${config.server.port}`)
)

// Connect to MongoDB
try {
  switch (config.env) {
    case 'development':
    case 'production':
      await connectMongo(config.env)
      break
    default:
      throw new Error('NODE_ENV is not defined')
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}
