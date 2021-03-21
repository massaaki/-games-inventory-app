import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import { Email as EmailIcon } from '@styled-icons/material-outlined/Email'
import { LockAlt as PasswordIcon } from '@styled-icons/boxicons-regular/LockAlt'
import { ErrorOutline as ErrorIcon } from '@styled-icons/material-outlined/'

import { FieldErrors, signInValidate } from 'utils/valitations'

import TextField from 'components/TextField'
import Button from 'components/Button'

import { FormLink, FormWrapper, FormLoading, FormError } from 'components/Form'
import * as S from './styles'

const FormSignIn = () => {
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const routes = useRouter()
  const { push, query } = routes

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    //Sign in
    const errors = signInValidate(values)

    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      setLoading(false)
      return
    }
    setFieldErrors({})

    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
    })

    if (result?.url) {
      return push(result?.url)
    }
    setLoading(false)

    setFormError('username or password is invalid')
  }
  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorIcon />
          {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          error={fieldErrors?.email}
          type="email"
          onInputChange={(v) => handleInput('email', v)}
          icon={<EmailIcon />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldErrors?.password}
          onInputChange={(v) => handleInput('password', v)}
          icon={<PasswordIcon />}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign in now</span>}
        </Button>

        <FormLink>
          Don´t have an account?{' '}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
