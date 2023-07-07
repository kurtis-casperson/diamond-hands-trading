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

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }))

app.use(express.static(path.join(__dirname, '../../client/dist')))

app.get('/:route(Trade|Login)', (req: Request, res: Response) => {
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
        `finnhub.io/api/v1/quote?symbol=${stockSymbol}`
      )

      const data = response.data
      res.json(data)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)
