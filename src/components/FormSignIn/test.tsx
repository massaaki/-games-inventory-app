import { render, screen } from 'utils/test-utils'

import FormSignIn from '.'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()

useRouter.mockImplementation(() => ({
  push,
  query: '',
  asPath: '',
  route: '/'
}))

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    const { container } = render(<FormSignIn />)

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Sign in now/i })
    ).toBeInTheDocument()

    expect(container.parentElement).toMatchSnapshot()
  })

  it('should render the forgot password link', () => {
    render(<FormSignIn />)

    expect(
      screen.getByRole('link', { name: /Forgot your password\?/i })
    ).toHaveAttribute('href', '#')
  })

  it('should render the text to sign up', () => {
    render(<FormSignIn />)

    expect(screen.getByText(/Don´t have an account\?/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Sign up/i })).toHaveAttribute(
      'href',
      '/sign-up'
    )
  })
})
