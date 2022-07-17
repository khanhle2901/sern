import db from '../models'
import CRUDService from '../services/CRUDService'

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll()
    return res.render('home-page')
  } catch (error) {
    console.log(error)
  }
  return res.render('home-page')
}

const getCrud = (req, res) => {
  return res.render('crud')
}

const postCrud = async (req, res) => {
  let message = await CRUDService.ceateNewUser(req.body)
  console.log(message)
  // try {
  //   await CRUDService.ceateNewUser(req.body)
  // } catch (error) {}
  return res.redirect('/get-crud')
}

const displayGetCrud = async (req, res) => {
  const data = await CRUDService.getAllUser()
  // console.log(data)
  return res.render('display-CRUD', { data })
}

const getEditCrud = async (req, res) => {
  let userId = req.query.id
  if (userId) {
    let userData = await CRUDService.getUserById(userId)
    if (!userData) {
    }
    return res.render('editCRUD', { userData })
  }
  return res.send('no id')
}

const putCrud = async (req, res) => {
  let data = req.body
  await CRUDService.updateUser(data)
  return res.redirect('/get-crud')
}

const deleteCrud = async (req, res) => {
  let id = req.query.id
  if (id) {
    await CRUDService.deleteUser(id)
    return res.redirect('/get-crud')
  }
  return res.send('no id')
}

module.exports = { getHomePage, getCrud, postCrud, displayGetCrud, getEditCrud, putCrud, deleteCrud }
