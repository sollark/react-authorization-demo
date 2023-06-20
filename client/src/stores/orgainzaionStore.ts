import { Organization } from '@/models/Organization'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface OrganizationState {
  organization: Organization | null
  setOrganization: (organization: Organization | null) => void
  clearOrganization: () => void
}

// Create a store with initial state
const useOrganizationStore = create<OrganizationState>()(
  persist(
    devtools(
      immer((set) => ({
        organization: null,
        setOrganization: (organization) => set(() => ({ organization })),
        clearOrganization: () => set(() => ({ organization: null })),
      }))
    ),
    { name: 'organization-storage' }
  )
)

export default useOrganizationStore
