import * as dotenv from 'dotenv'
import express from 'express'
import { Express, Request, Response } from 'express'
import axios from 'axios'

const app: Express = express()
const PORT: number = 4321
const cors = require('cors')
const path = require('path')
require('dotenv').config()
dotenv.config()
app.use(express.json())

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }))

app.use(express.static(path.join(__dirname, '../../client/dist')))

app.get('/:route(Trade|Login|Portfolio)', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'))
})

app.get(
  '/api/stock/search/:stockSearchInput',
  async (req: Request, res: Response) => {
    try {
      const { stockSearchInput } = req.params

      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${stockSearchInput}&limit=10&exchange=NASDAQ&apikey=${process.env.FMP_API_KEY}`
      )

      const data = response.data
      res.json(data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

app.get(
  '/api/stock/price/:stockSymbol',
  async (req: Request, res: Response) => {
    try {
      const { stockSymbol } = req.params

      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${process.env.FINHUB_API_KEY}`
      )

      const data = response.data.c

      res.json(data)
    } catch (error) {
      console.error('error', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

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

app.post('/api/trade', (req: Request, res: Response) => {
  const { name, symbol } = req.body
  console.log('tradeVariables', name, symbol)
  // console.log(req.body, req.query, req.params)
})
