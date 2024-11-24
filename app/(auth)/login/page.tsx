'use client'

import AuthForm from '@/components/AuthForm/AuthForm'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()

  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Отправить код"
      onSubmit={login}
      inputType="email"
      inputPlaceholder="Введите email"
    />
  )
}