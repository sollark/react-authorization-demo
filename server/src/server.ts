import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import path from 'path'
import http from 'http'
import { connectMongo } from './mongodb/connect.js'
import errorHandler from './middleware/errorHandler.js'

//import routes
import { authRoutes } from './api/auth/auth.routes.js'

// import for __dirname
import { fileURLToPath } from 'url'
import { config } from './config/config.js'
import setupAsyncLocalStorage from './middleware/als.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// middleware
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3030', 'http://localhost:8080'],
  })
)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

// als middleware
app.all('*', setupAsyncLocalStorage)

// routes
app.use('/api/auth', authRoutes)

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

server.listen(config.server.port, () =>
  console.log(`Server is up and running on port ${config.server.port}`)
)

// connect to MongoDB
connectMongo()
