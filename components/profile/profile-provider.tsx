'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { SITE_CONFIG } from '@/lib/config'

type ProfileContextValue = {
  photo: string | null
  setPhoto: (photo: string | null) => void
  hydrated: boolean
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

const STORAGE_KEY = `${SITE_CONFIG.slug}-profile-photo`

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [photo, setPhotoState] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setPhotoState(stored)
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  const setPhoto = (next: string | null) => {
    setPhotoState(next)
    try {
      if (next) localStorage.setItem(STORAGE_KEY, next)
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore quota errors
    }
  }

  return (
    <ProfileContext.Provider value={{ photo, setPhoto, hydrated }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
