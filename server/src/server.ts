import express, { Request, Response } from 'express'

const app = express()

// routing in express
app.get('/', (req, res) => res.send('Hello, World!'))

// always last line
app.listen(3030, () => console.log('Server is up and running on port 3030'))
