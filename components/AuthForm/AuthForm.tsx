import { useState } from "react"
import { AuthFormProps } from "./AuthForm.props"
import styles from './AuthForm.module.css'
import { Htag } from "@/components/Htag/Htag"
import { Input } from "../Input/Input"
import { Button } from "../Button/Button"
import LogoIcon from '../../public/logo.svg'
import { useAuth } from '@/contexts/AuthContext'
import { FieldError } from 'react-hook-form'

export default function AuthForm({
  title,
  label,
  buttonText,
  onSubmit,
  inputType = 'text',
  inputPlaceholder,
  error
}: AuthFormProps) {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { email } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (email) {
        await onSubmit(value, email)
      } else {
        await onSubmit(value)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={styles.authForm}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>
        <div className={styles.content}>
          <Htag tag="h1">{title}</Htag>

          {label && <p className={styles.label}>{label}</p>}

          <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                type={inputType}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={inputPlaceholder}
                required
                error={error}
                style={{ width: '250px' }}
              />

            <Button
              appearance="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка при авторизации...' : buttonText}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}