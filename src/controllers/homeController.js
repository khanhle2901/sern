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
  return res.send('hh')
}

module.exports = { getHomePage, getCrud, postCrud }
