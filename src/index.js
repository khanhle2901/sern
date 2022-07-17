import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import connectDB from './config/connectDB'
require('dotenv').config()

import viewEngine from './config/viewEngine'
import initWebRoute from './route/web'

const app = express()

// app.use(cors({ origin: true }))

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoute(app)

connectDB()

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('backend running on port: ' + port)
})
