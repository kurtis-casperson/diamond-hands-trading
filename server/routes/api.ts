const dotenv = require('dotenv')
const axios = require('axios')
const express = require('express')
const jwt = require('jsonwebtoken')
import client from '../db'

require('dotenv').config()

const router = express.Router()

router.get('/marketNews', async (req: any, res: any) => {
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
const sqlStatements = [
  `CREATE TABLE public.user_data (user_email character varying(100) NOT NULL,user_password character varying(100) NOT NULL,user_id integer NOT NULL);`,
  `CREATE TABLE public.stock_portfolio (user_id integer,company character varying(100), symbol character varying(10), shares integer, cost_basis numeric);`,
  `CREATE TABLE IF NOT EXISTS public.cash_transactions(transaction_id integer,user_id integer,transaction_type character varying(10) COLLATE pg_catalog."default",available_cash numeric,portfolio_value numeric)`,
  `CREATE SEQUENCE IF NOT EXISTS public.stock_portfolio_user_id_seq INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 OWNED BY stock_portfolio.user_id;`,
  `CREATE SEQUENCE public.user_data_user_data_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;`,
  `ALTER SEQUENCE public.stock_portfolio_user_id_seq OWNED BY public.stock_portfolio.user_id;`,
  `ALTER SEQUENCE public.user_data_user_data_seq OWNED BY public.user_data.user_id;`,
  `ALTER TABLE ONLY public.user_data ALTER COLUMN user_id SET DEFAULT nextval('public.user_data_user_data_seq'::regclass);`,
  `ALTER TABLE ONLY public.user_data ADD CONSTRAINT user_data_pkey PRIMARY KEY (user_id);`,
  `ALTER TABLE ONLY public.stock_portfolio ADD CONSTRAINT stock_portfolio_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_data(user_id);`,
]
router.get('/createTables', async (req: any, res: any) => {
  const resp = createTables()
  res.send({ message: 'created' })
})
const createTables = async () => {
  sqlStatements.forEach(async (sqlStatement) => {
    try {
      console.log(sqlStatement)
      await client.query(sqlStatement)
    } catch (e) {
      console.log(sqlStatement, e)
    }
  })
  return true
}
router.post(`/trade/:inSellState`, async (req: any, res: any) => {
  try {
    const { inSellState } = req.params

    const { company, symbol, user, cost_basis, shares, available_cash } =
      req.body

    const selectAllStocks = await client.query(
      `SELECT "symbol" FROM public."stock_portfolio" WHERE user_id = $1 AND symbol = $2`,
      [user, symbol]
    )

    if (selectAllStocks.rows.length === 0) {
      const insertRowDataQuery = `
        INSERT INTO public."stock_portfolio" ( "company","symbol", "user_id", "cost_basis", "shares") VALUES ($1, $2, $3, $4, $5)
          RETURNING *`
      client.query(insertRowDataQuery, [
        company,
        symbol,
        user,
        cost_basis,
        shares,
      ])
      if (inSellState === 'false') {
        const updateCashQueryBuy = `UPDATE public."cash_transactions" SET "available_cash" = "available_cash" - $1 WHERE user_id = $2`

        client.query(updateCashQueryBuy, [cost_basis, user])
      }
      if (inSellState === 'true') {
        const updateCashQuerySell = `UPDATE public."cash_transactions" SET "available_cash" = "available_cash" + $1 WHERE user_id = $2`

        client.query(updateCashQuerySell, [cost_basis, user])
      }
    }

    if (selectAllStocks.rows.length > 0 && inSellState === 'false') {
      const updateStockQueryBuy = `UPDATE public."stock_portfolio" SET "shares" = "shares" + $1, "cost_basis" = "cost_basis" + $2 WHERE symbol = $3 AND user_id = $4`
      const updateCashQueryBuy = `UPDATE public."cash_transactions" SET "available_cash" = "available_cash" - $1 WHERE user_id = $2`

      client.query(updateCashQueryBuy, [cost_basis, user])
      client.query(updateStockQueryBuy, [shares, cost_basis, symbol, user])
    }
    if (selectAllStocks.rows.length > 0 && inSellState === 'true') {
      const updateStockQuerySell = `UPDATE public."stock_portfolio" SET "shares" = "shares" - $1, "cost_basis" = "cost_basis" - $2 WHERE symbol = $3 AND user_id = $4`
      const updateCashQuerySell = `UPDATE public."cash_transactions" SET "available_cash" = "available_cash" + $1 WHERE user_id = $2`

      client.query(updateCashQuerySell, [cost_basis, user])
      client.query(updateStockQuerySell, [shares, cost_basis, symbol, user])
    }
  } catch (err) {
    console.error('Error inserting data:', err)
    res.status(500).json({ error: 'Error inserting data' })
  }
})
router.get('/dbtest', async (req: any, res: any) => {
  const databaseRes = await client.query(`SELECT "user_email" FROM "user_data"`)
  res.send(databaseRes)
})
router.post('/signup', async (req: any, res: any) => {
  try {
    const { user_email, user_password } = req.body

    const signupQuery = `INSERT INTO "user_data" ( "user_email","user_password") VALUES ($1, $2)`

    const databaseRes = await client.query(
      `SELECT "user_email" FROM "user_data" WHERE "user_email" = $1`,
      [user_email]
    )
    const selectUser = `SELECT "user_id" FROM "user_data" WHERE "user_email" = $1`

    const InsertCashQuery = `
    INSERT INTO "cash_transactions" ( "user_id","available_cash") VALUES ($1, $2)
      RETURNING *`

    if (databaseRes.rows.length > 0) {
      res.status(501).json({ error: 'User already exists' })
    } else {
      await client.query(signupQuery, [user_email, user_password])

      const selectedUserID = await client.query(selectUser, [user_email])

      await client.query(InsertCashQuery, [
        selectedUserID.rows[0].user_id,
        100000,
      ])
      await client.commit()
      res.status(201).json({ message: 'Successfully Registered' })
    }
  } catch (err) {
    console.log(err)

    res.status(501).json({ error: 'Error creating user' })
  }
})
router.get('/dbtest', async (req: any, res: any) => {
  try {
    const databaseRes = await client.query(
      `SELECT "user_email" FROM public."user_data"`
    )
    res.send(databaseRes)
  } catch (e) {
    console.log('dbtest', e)
    res.send({ error: 'Error querying user' })
  }
})
router.post('/login', async (req: any, res: any) => {
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

      return res.json({ token })
    }
  } catch (err) {
    console.log(err)
  }
})

router.post(`/get_cash/`, async (req: any, res: any) => {
  try {
    const { userId } = req.body

    const getCashQuery = await client.query(
      `SELECT "available_cash" FROM public."cash_transactions" WHERE user_id = $1`,
      [userId]
    )

    if (getCashQuery.rows) {
      res.json(getCashQuery)
    } else {
      return res.json(100000)
    }
  } catch (err) {
    console.error('Error getting data:', err)
    res.status(500).json({ error: 'Error getting data' })
  }
})

router.post(`/stock_data/`, async (req: any, res: any) => {
  type stockType = {
    tableData: {}
    sumData: {
      stockValue: number[]
      totalValue: number
      stockSymbol: number[]
    }
  }

  const { userId } = req.body
  console.log('user_id', userId)
  try {
    const getPortfolioData = await client.query(
      `SELECT * FROM public."stock_portfolio" WHERE user_id = $1`,

      [userId]
    )
    let portfolioData: stockType = {
      tableData: {
        portfolioData: getPortfolioData.rows,
      },
      sumData: {
        totalValue: 0,
        stockSymbol: [],
        stockValue: [],
      },
    }
    let totalStockValue: number
    for (const arr of getPortfolioData.rows) {
      const symbol = arr.symbol
      const numberShares = arr.shares

      const stockPrices = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINHUB_API_KEY}`
      )

      totalStockValue = stockPrices.data.c * numberShares
      portfolioData.sumData.stockSymbol.push(symbol)
      portfolioData.sumData.stockValue.push(totalStockValue)
      portfolioData.sumData.totalValue += totalStockValue
    }

    if (getPortfolioData.rows === 0) {
      res.status(501).json({ error: 'error loading data' })
    }

    console.log('data', getPortfolioData.rows)
    res.json(portfolioData)
  } catch (err) {
    console.error('Error getting data:', err)
    res.status(500).json({ error: 'Error getting data' })
  }
})

export default router
