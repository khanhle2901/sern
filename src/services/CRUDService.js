import bcrypt from 'bcryptjs'
import db from '../models'

const salt = bcrypt.genSaltSync(10)

const ceateNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve('success')
    } catch (error) {
      reject(error)
    }
  })
}

const hashUserPassWord = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassWord = await bcrypt.hashSync(password, salt)
      resolve(hashPassWord)
    } catch (error) {
      reject(error)
    }
  })
}

const hash = bcrypt.hashSync('B4c0//', salt)

module.exports = { ceateNewUser }
