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
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

app.get('/api/marketNews', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/news?category=general&token=${process.env.FINHUB_API_KEY}`
    )

    const startIndex = 0
    const endIndex = 4
    const rangeData = response.data.slice(startIndex, endIndex)

    res.json(rangeData)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

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
    const { company, symbol, user } = req.body
    const query = `
    INSERT INTO public."stock_portfolio" ( "company","symbol", "user_id") VALUES ($1, $2, $3)
      RETURNING *`
    await client.query(query, [company, symbol, user])
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
    const { user_email, user_password } = req.body

    const databaseRes = await client.query(
      `SELECT * FROM public."user_data" 
        WHERE "user_email" = $1 AND "user_password" = $2 `,
      [user_email, user_password]
    )

    if (databaseRes.rows.length === 0) {
      res.status(501).json({ error: 'user does NOT exist' })
    } else {
      const userEmail = databaseRes.rows[0].user_email
      const userID = databaseRes.rows[0].user_id
      const token = jwt.sign({ userEmail, userID }, process.env.ACCESS_TOKEN)
      console.log(userID)
      return res.json({ token })
    }
  } catch (err) {
    // send error 500
    console.log(err)
  }
})

app.post('/api/data', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body
    console.log('user_id', user_id)
    const databaseRes = await client.query(
      `SELECT * FROM public."stock_portfolio" WHERE user_id = $1`,
      [user_id]
    )
    if (databaseRes === 0) {
      res.status(501).json({ error: 'error loading data' })
    } else {
      return res.json(databaseRes.rows)
    }
  } catch (err) {
    console.log(err)
  }
})
