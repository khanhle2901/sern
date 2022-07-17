import express from 'express'
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'

const route = express.Router()

const initWebRoute = (app) => {
  route.get('/', homeController.getHomePage)
  route.get('/crud', homeController.getCrud)
  route.get('/get-crud', homeController.displayGetCrud)
  route.get('/edit-crud', homeController.getEditCrud)
  route.post('/post-crud', homeController.postCrud)
  route.post('/put-crud', homeController.putCrud)
  route.get('/delete-crud', homeController.deleteCrud)

  route.get('/hoi-khanh', (req, res) => res.send('hoi from khanh'))
  //

  route.post('/api/login', userController.handleLogin)
  route.get('/api/get-all-user', userController.handleGetAllUser)
  route.post('/api/create-new-user', userController.handleCreateNewUser)

  return app.use('/', route)
}

module.exports = initWebRoute
