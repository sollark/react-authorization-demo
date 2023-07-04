import { User } from './User'
import { Workspace } from './Workspace'

export interface Account {
  isComplete: boolean
  user: User
  workspaces: Workspace[]
}
