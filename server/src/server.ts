import express, { Request, Response } from 'express'
import http from 'http'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const MONGO_URL =
  'mongodb+srv://database:xlZ4EwyLLAQtGYr8@cluster0.il5oooq.mongodb.net/?retryWrites=true&w=majority'

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

// always last line
server.listen(3030, () => console.log('Server is up and running on port 3030'))

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'))
mongoose.connection.on('error', (err: Error) => console.log(err))
