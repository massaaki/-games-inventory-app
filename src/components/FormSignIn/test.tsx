import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import FormSignIn from '.'

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    const { container } = renderWithTheme(<FormSignIn />)

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Sign in now/i })
    ).toBeInTheDocument()

    expect(container.parentElement).toMatchSnapshot()
  })

  it('should render the forgot password link', () => {
    renderWithTheme(<FormSignIn />)

    expect(
      screen.getByRole('link', { name: /Forgot your password\?/i })
    ).toHaveAttribute('href', '#')
  })

  it('should render the text to sign up', () => {
    renderWithTheme(<FormSignIn />)

    expect(screen.getByText(/Don´t have an account\?/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Sign up/i })).toHaveAttribute(
      'href',
      '/sign-up'
    )
  })
})
