import userService from '../services/userService'

const handleLogin = async (req, res) => {
  let email = req.body.email
  let passWord = req.body.passWord

  if (!email || !passWord) {
    return res.status(500).json({
      errCode: 1,
      errMessage: 'Missing params',
    })
  }

  let user = await userService.handleLogin(email, passWord)

  return res.status(200).json(user)
}

const handleGetAllUser = async (req, res) => {
  let id = req.query.id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required params',
      users: {},
    })
  }
  let users = await userService.getAllUser(id)

  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    users,
  })
}

const handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body)
  return res.status(200).json(message)
}

module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
}
