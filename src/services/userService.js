import db from '../models'
import bcrypt from 'bcryptjs'

const handleLogin = (email, passWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {}
      let isExist = await checkUserEmail(email)
      if (isExist) {
        let user = await db.User.findOne({ where: { email }, attributes: ['email', 'roleId', 'passWord'], raw: true })
        if (user) {
          let check = await bcrypt.compareSync(passWord, user.passWord)
          if (check) {
            userData.errcode = 0
            userData.errMessage = 'OK'
            delete user.passWord
            userData.user = user
          } else {
            userData.errcode = 3
            userData.errMessage = 'Wrong password'
          }
        } else {
          userData.errcode = 2
          userData.errMessage = 'User not found'
        }
      } else {
        userData.errcode = 1
        userData.errMessage = 'Email doesnot exist'
      }
      userData.user ? null : (userData.user = {})
      resolve(userData)
    } catch (error) {
      reject(error)
    }
  })
}

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { email } })
      if (user) {
        resolve(true)
      }
      resolve(false)
    } catch (e) {
      reject(e)
    }
  })
}

const getAllUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = ''
      if (id === 'All') {
        users = await db.User.findAll({ attributes: { exclude: ['passWord'] } })
      }

      if (id && id != 'All') {
        users = await db.User.findOne({ where: { id }, attributes: { exclude: ['passWord'] } })
      }

      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email)
      if (check === true) {
        resolve({
          errcode: 1,
          errMessage: 'Your email is already exist!',
        })
      }
      let hashPassWordFromBcrypt = await hashUserPassWord(data.passWord)
      await db.User.create({
        email: data.email,
        passWord: hashPassWordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId,
      })
      resolve({
        errcode: 0,
        errMessage: 'OK',
      })
    } catch (error) {
      reject(error)
    }
  })
}

////////////////

const salt = bcrypt.genSaltSync(10)

const hashUserPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWord = await bcrypt.hashSync(password, salt)
      resolve(hashPassWord)
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = { handleLogin, getAllUser, createNewUser }
