const dotenv = require('dotenv')
const axios = require('axios')
const express = require('express')

require('dotenv').config()

const router = express.Router()

router.get('/search/:stockSearchInput', async (req: any, res: any) => {
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
})

router.get('/price/:stockSymbol', async (req: any, res: any) => {
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
})

export default router
