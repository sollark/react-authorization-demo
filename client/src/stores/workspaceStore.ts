import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface WorkspaceState {
  workspace: {
    firstName: string
    lastname: string
  } | null

  setWorkspace: (workspace: WorkspaceState['workspace']) => void
}

// Create a store with initial state
const useWorkspaceStore = create<WorkspaceState>()(
  devtools(
    immer((set) => ({
      workspace: null,
      setWorkspace: (workspace) => set({ workspace }),
    }))
  )
)

export default useWorkspaceStore
