'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Добавляем небольшую задержку, чтобы убедиться, что состояние авторизации обновилось
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          router.replace('/projects')
        } else {
          router.replace('/login')
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [loading, user, router])

  return <LoadingSpinner />
}
