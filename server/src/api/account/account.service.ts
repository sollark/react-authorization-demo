// import { UserRole, USER_ROLE } from '../../config/userRoles.js'
import UserModel from '../../mongodb/models/user.model.js'
import logger from '../../service/logger.service.js'

const addUser = async (
  identifier: string,
  name?: string,
  lastname?: string
  // organization: string,
  // roles: UserRole[] = [USER_ROLE.Guest] as UserRole[]
) => {
  const user = await UserModel.create({
    identifier,
    name,
    lastname,
    // organization,
    // roles,
  })

  logger.info(`user.service - user added: ${user}`)

  return user
}

const getUser = async (identifier: string) => {
  const user = UserModel.findOne({ identifier })

  logger.info(`user.service - user fetched: ${user}`)

  return user
}

// const getRoles = async (email: string) => {
//   const user = await UserModel.findOne({ email })

//   logger.info(`user.service - user roles fetched: ${user}`)

//   return user?.roles
// }

export const userService = {
  addUser,
  getUser,
}
