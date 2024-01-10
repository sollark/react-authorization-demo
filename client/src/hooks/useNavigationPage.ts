import { getAdminPages, getUserPages } from '@/cmps/menu/Pages'
import { Role } from '@/models/Account'
import { useEffect, useState } from 'react'

export function useNavigationPages(role: Role) {
  const [pages, setPages] = useState<{ key: string; link: JSX.Element }[]>([])

  useEffect(() => {
    const userPages = getUserPages()
    const adminPages = getAdminPages()

    const navigationPages = {
      guest: userPages,
      user: userPages,
      supervisor: userPages,
      manager: adminPages,
      admin: adminPages,
    }

    setPages(navigationPages[role])
  }, [role])

  return pages
}
