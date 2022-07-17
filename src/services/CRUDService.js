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

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({ raw: true })
      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

const getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: userId }, raw: true })
      if (user) {
        resolve(user)
      } else {
        resolve({})
      }
    } catch (error) {
      reject(error)
    }
  })
}

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: data.userId } })
      if (user) {
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.address = data.address
        await user.save()
        resolve()
      } else {
        resolve()
      }
    } catch (error) {
      reject(error)
    }
  })
  console.log('data', data)
}

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id } })
      if (user) {
        await user.destroy()
      }
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

const hash = bcrypt.hashSync('B4c0//', salt)

module.exports = { ceateNewUser, getAllUser, getUserById, updateUser, deleteUser }
