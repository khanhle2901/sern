import express from 'express'
import bodyParser from 'body-parser'
require('dotenv').config()

import viewEngine from './config/viewEngine'
import initWebRoute from './route/web'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoute(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('backend running on port: ' + port)
})
