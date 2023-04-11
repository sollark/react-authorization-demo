import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { connectMongo } from './mongodb/connect.js'

//import routes
import { authRoutes } from './api/auth/auth.routes.js'

const app = express()

// middleware
app.use(
  cors({
    credentials: true,
  })
)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

// routing in express
// server.get('/', (req, res) => res.send('Hello, World!'))
app.use('/api/auth', authRoutes)

server.listen(3030, () => console.log('Server is up and running on port 3030'))

// connect to MongoDB
connectMongo()
