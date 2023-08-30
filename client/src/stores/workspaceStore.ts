import { Workspace } from '@/models/Workspace'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { zustandLogger } from './zustandLogger'

interface WorkspaceState {
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace) => void
  clearWorkspace: () => void
}

const useWorkspaceStore = create<WorkspaceState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          workspace: null,
          setWorkspace: (workspace) => set(() => ({ workspace })),
          clearWorkspace: () => set(() => ({ workspace: null })),
        }))
      ),
      { name: 'workspace-storage' }
    )
  )
)

export default useWorkspaceStore
