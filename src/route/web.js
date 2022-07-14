import express from 'express'
import homeController from '../controllers/homeController'

const route = express.Router()

const initWebRoute = (app) => {
  route.get('/', homeController.getHomePage)

  route.get('/hoi-khanh', (req, res) => res.send('hoi from khanh'))

  return app.use('/', route)
}

module.exports = initWebRoute
