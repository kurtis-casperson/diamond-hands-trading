import client from './db'
import stockRoutes from './routes/stocks'
import apiRoutes from './routes/api'
const dotenv = require('dotenv')
const axios = require('axios')
const express = require('express')
const app: any = express()
const PORT: any = 4321
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')
require('dotenv').config()

app.use(express.json())
app.use('/api/stock', stockRoutes)
app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }))

app.use(express.static(path.join(__dirname, '../../client/dist')))
const GC_RELEASE = '2023-11-30'
app.get('/release', (req: any, res: any) => {
  res.send(GC_RELEASE)
})
app.get('/:route(Trade|Login|Portfolio)', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'))
})
