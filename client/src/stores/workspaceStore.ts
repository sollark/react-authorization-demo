import { Workspace } from '@/models/Workspace'
import { create } from 'zustand'
import { zustandLogger } from './zustandLogger'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface WorkspaceState {
  workspaces: Workspace[] | null
  activeWorkspace: Workspace | null
  setWorkspaces: (workspaces: Workspace[]) => void
  setActiveWorkspace: (workspace: Workspace) => void
  clearWorkspaces: () => void
}

const useWorkspaceStore = create<WorkspaceState>()(
  zustandLogger(
    persist(
      devtools(
        immer((set) => ({
          workspaces: null,
          activeWorkspace: null,
          setWorkspaces: (workspaces) => set(() => ({ workspaces })),
          setActiveWorkspace: (workspace) =>
            set(() => ({ activeWorkspace: workspace })),
          clearWorkspaces: () =>
            set(() => ({ workspaces: null, activeWorkspace: null })),
        }))
      ),
      { name: 'workspace-storage' }
    )
  )
)

export default useWorkspaceStore
