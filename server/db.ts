const { Client } = require('pg')

const client = new Client({
  // host: 'database-1-diamond-trading.czggh6d9nqaf.us-west-1.rds.amazonaws.com',
  host: 'localhost',
  user: 'postgres',
  password: process.env.PGADMIN_PWD,
  port: 5432,
  database: 'postgres',
  // ssl: {
  //   rejectUnauthorized: false,
  // },
})

client.connect()

export default client
