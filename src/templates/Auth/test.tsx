import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Auth from '.'

describe('<Auth />', () => {
  it('should render all components and children', () => {
    renderWithTheme(
      <Auth title="Auth title">
        <input type="text" data-testid="form" />
      </Auth>
    )

    expect(screen.getAllByLabelText(/Won Games/i)).toHaveLength(2)
    expect(
      screen.getByRole('heading', {
        name: /All your favorite games in one place/i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /WON is the best and most complete gaming platform./i
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /Auth title/i })
    ).toBeInTheDocument()

    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
})
