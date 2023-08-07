import * as dotenv from 'dotenv'
import express from 'express'
import { Express, Request, Response } from 'express'
import axios from 'axios'

const app: Express = express()
const PORT: number = 4321
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')
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

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  database: 'postgres',
})

client.connect()

app.post('/api/trade', async (req: Request, res: Response) => {
  try {
    const { company, symbol } = req.body
    const query = `INSERT INTO public."stock_portfolio" ( "company","symbol") VALUES ($1, $2)`
    await client.query(query, [company, symbol])
    console.log('tradeVariables', company, symbol)
  } catch (err) {
    console.error('Error inserting data:', err)
    res.status(500).json({ error: 'Error inserting data' })
  }
})

app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const { user_email, user_password } = req.body

    const signupQuery = `INSERT INTO public."user_data" ( "user_email","user_password") VALUES ($1, $2)`

    const databaseRes = await client.query(
      `SELECT "user_email" FROM public."user_data" WHERE "user_email" = $1`,
      [user_email]
    )
    if (databaseRes.rows.length > 0) {
      res.status(501).json({ error: 'User already exists' })
    } else {
      res.status(201).json({ message: 'Successfully Registered' })
      await client.query(signupQuery, [user_email, user_password])
    }
  } catch (err) {
    console.log(err)
  }
})

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { user_email } = req.body
    console.log(user_email)
    const databaseRes = await client.query(
      `SELECT "user_email" FROM public."user_data" WHERE "user_email" = $1`,
      [user_email]
    )

    if (databaseRes.rows.length === 0) {
      res.status(501).json({ error: 'user does NOT exist' })
    } else {
      res.status(201).json({ message: 'Successfully Logged In' })
      const accessToken = jwt.sign(user_email, process.env.ACCESS_TOKEN)
      res.json({ accessToken: accessToken })
    }
  } catch (err) {
    console.log(err)
  }
})
