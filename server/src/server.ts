import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import path from 'path'
import { config } from './config/config.js'
import { connectMongo } from './mongodb/connect.js'

// import middleware
import setupAsyncLocalStorage from './middleware/als.js'
import { deleteSensitiveData } from './middleware/deleteSensitiveData.js'
import errorHandler from './middleware/errorHandler.js'

// import routes
import { accountRoutes } from './api/account/account.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { workplaceRoutes } from './api/workspace/workspace.routes.js'

// import for __dirname
import { fileURLToPath } from 'url'
import { profileRoutes } from './api/profile/profile.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = http.createServer(app)

// middlewares
app.use(
  cors({
    credentials: true,
    origin: config.server.origins,
  })
)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

// async local storage
app.all('*', setupAsyncLocalStorage)

// delete sensitive data ('__v', '_id', 'identifier')
app.use(deleteSensitiveData)

// routes
app.use('/api/auth', authRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/workplace', workplaceRoutes)

// server globals
const publicPath = path.join(__dirname, '../public/index.html')
const clientRoutes = ['/']
app.get(clientRoutes, (req, res, next) => res.sendFile(publicPath))

// 404
app.use(clientRoutes, (req, res, next) => {
  const error = new Error(`${req.method} ${req.originalUrl} not found`)
  next(error)
})

// error handler
app.use(errorHandler)

// start server
server.listen(config.server.port, () =>
  console.log(`Server is up and running on port ${config.server.port}`)
)

// connect to MongoDB
try {
  await connectMongo()
} catch (error) {
  process.exit(1)
}
