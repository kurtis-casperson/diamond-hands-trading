import express from 'express'
import { Express, Request, Response } from 'express'
import axios from 'axios'

const app: Express = express()
const PORT: number = 4321
const cors = require('cors')
const path = require('path')

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }))

app.use(express.static(path.join(__dirname, '../../client/dist')))

app.get('/:route(Trade|Login|Portfolio)', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'))
})

const { Client } = require('pg')

const portfolioTable = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  database: 'postgres',
})

portfolioTable.connect()

portfolioTable.query(
  'SELECT * FROM public. "Stock_Portfolio"',
  (err: any, res: any) => {
    err ? console.log(err.message) : console.log(res)

    portfolioTable.end
  }
)

app.post('//api/trade/data', (req: Request, res: Response) => {})

// try {
//   const res = await portfolioTable.query(
//     'SELECT * FROM public. "Stock_Portfolio"'
//   )
//   console.log(res)
// } catch (err) {
//   console.error(err)
// } finally {
//   await portfolioTable.end()
// }
