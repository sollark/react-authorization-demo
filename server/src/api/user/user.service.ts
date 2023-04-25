import UserModel from '../../mongodb/models/user.model.js'

const addUser = async (
  name: string,
  lastname: string,
  email: string,
  roles = { guest: 1000 }
) => {
  const user = await UserModel.create({ name, lastname, email, roles })

  return user
}

const getUser = async (email: string) => {
  const user = UserModel.findOne({ email })

  return user
}

const getRoles = async (email: string) => {
  const user = await UserModel.findOne({ email })

  return user?.roles
}

export const userService = {
  addUser,
  getUser,
  getRoles,
}
