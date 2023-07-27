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

// portfolioTable.query(
//   'SELECT * FROM public. "stock_portfolio"',
//   (err: any, res: any) => {
//     err ? console.log(err.message) : console.log(res)

//     portfolioTable.end
//   }
// )

app.post('/api/trade', async (req: Request, res: Response) => {
  try {
    const { company, symbol } = req.body
    const query = `INSERT INTO public."stock_portfolio" ( "company","symbol") VALUES ($1, $2)`
    await portfolioTable.query(query, [company, symbol])
    console.log('tradeVariables', company, symbol)
  } catch (err) {
    console.error('Error inserting data:', err)
    res.status(500).json({ error: 'Error inserting data' })
  }
})

// portfolioTable.query(
//   'SELECT * FROM public. "user_data"',
//   (err: any, res: any) => {
//     err ? console.log(err.message) : console.log(res)

//     portfolioTable.end
//   }
// )

// portfolioTable.query(
//   `SELECT "user_email" FROM public."user_data"`,
//   (err: any, res: any) => {
//     let users = res.rows
//     console.log(typeof users)
//     users.map((user: any) => {
//       if (user.user_email === 'kcasperson7@gmail.com') return
//       console.log(user.user_email)
//     })

// err ? console.log(err.message) : console.log(res.rows)

// portfolioTable.end
//   }
// )

app.post('/api/signup', async (req: Request, res: any) => {
  try {
    const { user_email, user_password } = req.body
    const query = `INSERT INTO public."user_data" ( "user_email","user_password") VALUES ($1, $2)`
    const selectedUsers = `SELECT "user_email" FROM public."user_data"`
    // map over selectedUsers?
    console.log('selectedUsers', selectedUsers)
    console.log('res', res.ServerResponse)
    let users = res.body
    users.map(async (user: any) => {
      if (user_email !== selectedUsers) {
        await portfolioTable.query(query, [user_email, user_password])
        console.log(user_email, user_password)
      } else {
        res.send('User already exists, please signin')
      }
    })
  } catch (err) {
    console.error('Error logging in:', err)
    res.status(500).json({ error: 'Error logging in' })
  }
})

// this will check and authenticate
// app.post('/api/login', async (req: Request, res: Response) => {
//   try {
//     const { user_email, user_password } = req.body
//     const query = `INSERT INTO public."user_data" ( "user_email","user_password") VALUES ($1, $2)`
//     await portfolioTable.query(query, [user_email, user_password])
//     console.log(user_email, user_password)
//   } catch (err) {
//     console.error('Error logging in:', err)
//     res.status(500).json({ error: 'Error logging in' })
//   }
// })
