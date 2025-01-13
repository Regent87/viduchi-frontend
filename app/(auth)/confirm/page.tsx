'use client'

import { useAuth } from '@/contexts/AuthContext'
import AuthForm from '@/components/AuthForm/AuthForm'

export default function ConfirmPage() {
  const { confirmOtp, email } = useAuth()

  return (
    <div>
      <AuthForm
        title="Подтверждение входа"
        label={`Введите код подтверждения, отправленный на ${email}`}
        buttonText="Подтвердить"
        onSubmit={confirmOtp}
        inputType="text"
        inputPlaceholder="Введите код подтверждения"
      />
    </div>
  )
}
