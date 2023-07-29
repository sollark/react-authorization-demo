import { User } from './User'
import { EncodedWorkspace, Workspace } from './Workspace'

export interface Account {
  isComplete: boolean
  user: User
  workspaces: Workspace[] | EncodedWorkspace[]
}
