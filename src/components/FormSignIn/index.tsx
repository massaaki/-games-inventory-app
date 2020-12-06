import Link from 'next/link'

import { Email as EmailIcon } from '@styled-icons/material-outlined/Email'
import { LockAlt as PasswordIcon } from '@styled-icons/boxicons-regular/LockAlt'

import TextField from 'components/TextField'
import Button from 'components/Button'

import * as S from './styles'
import { FormLink, FormWrapper } from 'components/Form'
const FormSignIn = () => (
  <FormWrapper>
    <form>
      <TextField
        name="email"
        placeholder="Email"
        type="email"
        icon={<EmailIcon />}
      />
      <TextField
        name="password"
        placeholder="Password"
        type="password"
        icon={<PasswordIcon />}
      />
      <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
      <Button size="large" fullWidth>
        Sign in now
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

export default FormSignIn
