import { Schema, model } from 'mongoose'

export interface Role {
  value: string
}

const RoleSchema = new Schema({
  role: { type: String, required: true, unique: true, immutable: true },
})

const RoleModel = model<Role>('Roles', RoleSchema)
export default RoleModel

// Define a variable to hold the user roles
export let USER_ROLE: Record<string, string> = {}

// Function to fetch roles from the database and create USER_ROLE
const createUserRoleFromDB = async (): Promise<void> => {
  try {
    const rolesFromDB: Role[] = await RoleModel.find({}, { _id: 0, role: 1 })

    USER_ROLE = rolesFromDB.reduce(
      (userRole: Record<string, string>, { value }) => {
        userRole[value] = value
        return userRole
      },
      {}
    )
  } catch (error) {
    console.error('Error creating USER_ROLE from DB:', error)
    throw error
  }
}

// Call the function to populate USER_ROLE when the app starts
createUserRoleFromDB().catch((error) => {
  console.error('Error populating USER_ROLE:', error)
})
