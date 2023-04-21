import UserModel from '../../mongodb/models/user.model.js'

const addUser = async (
  name: string,
  lastname: string,
  email: string,
  role: object
) => {
  const user = await UserModel.create({ name, lastname, email, role })

  return user
}

export const userService = {
  addUser,
}
