import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'
import { accountRoutes } from './api/account/account.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { companyRoutes } from './api/company/company.routes.js'
import { employeeRoutes } from './api/employee/employee.routes.js'
import { profileRoutes } from './api/profile/profile.routes.js'
import { config } from './config/config.js'
import setupAsyncLocalStorage from './middleware/als.js'
import { deleteSensitiveData } from './middleware/deleteSensitiveData.js'
import errorHandler from './middleware/errorHandler.js'
import { connectMongo } from './mongodb/connect.js'
import { set } from 'mongoose'
import setHeaders from './middleware/setHeaders.js'

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

// Middlewares
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.all('*', setupAsyncLocalStorage) // async local storage
app.use(deleteSensitiveData) // delete sensitive data ('__v', '_id', 'identifier', 'password', 'uuid')
app.use(setHeaders)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/company', companyRoutes)

// Serve i18n files
app.use('/i18n', express.static(path.join(__dirname, '../public/i18n')))

// Proxy middleware for development environment:
// Redirects all requests to the Vite development server to enable hot-reloading and other dev features.
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
  const staticPath = path.join(__dirname, '../public')
  console.log('staticPath', staticPath)
  app.use(express.static(staticPath))
}

// Serve index.html for all other routes
const publicPath = path.join(__dirname, '../public', 'index.html')
console.log('publicPath', publicPath)
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
  await connectMongo()
} catch (error) {
  process.exit(1)
}
