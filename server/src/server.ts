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

// import for __dirname
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log('__dirname', __dirname)

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

// middlewares
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

// async local storage
app.all('*', setupAsyncLocalStorage)

// delete sensitive data ('__v', '_id', 'identifier', 'password', 'uuid')
app.use(deleteSensitiveData)

// Serve test file as static file
const testFilePath = path.join(__dirname, '../public')
console.log('testFilePath', testFilePath)
app.use('/test', express.static(testFilePath))

// routes
// app.use('/api/auth', authRoutes)
// app.use('/api/account', accountRoutes)
// app.use('/api/profile', profileRoutes)
// app.use('/api/employee', employeeRoutes)
// app.use('/api/company', companyRoutes)

// Serve i18n files
const i18nPath = path.join(__dirname, '../public/i18n/locales')
console.log('i18nPath', i18nPath)
// app.use(
//   '/i18n/locales',
//   express.static(i18nPath, {
//     setHeaders: (res, filePath) => {
//       res.setHeader('Content-Type', 'application/json')
//     },
//   })
// )

// Serve static files
const staticPath = path.join(__dirname, '../public')
// app.use(express.static(staticPath))

// server globals
const publicPath = path.join(__dirname, '../public', 'index.html')
const clientRoute = '/**'

// Serve index.html for all other routes
// app.get(clientRoute, (req, res, next) => res.sendFile(publicPath))

// 404
// app.use(clientRoute, (req, res, next) => {
//   const error = new Error(`${req.method} ${req.originalUrl} not found!`)
//   next(error)
// })

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
