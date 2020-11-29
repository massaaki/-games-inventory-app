import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Banner from '.'

describe('<Banner />', () => {
  it('should render correctly', () => {
    const { container } = renderWithTheme(
      <Banner
        title="some title"
        subtitle="some subtitle"
        img="someUrl"
        buttonLabel="some button label"
        buttonLink="some button link"
      />
    )

    // Verifique se o titulo existe
    expect(
      screen.getByRole('heading', {
        name: /some title/i
      })
    ).toBeInTheDocument()

    // Verifique se o subititle está sendo renderizado
    expect(
      screen.getByRole('heading', { name: /some subtitle/i })
    ).toBeInTheDocument()

    // verifique se a imagem existe
    expect(screen.getByRole('img', { name: /some title/i })).toHaveAttribute(
      'src',
      'someUrl'
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  it('it should render a Ribbon', () => {
    renderWithTheme(
      <Banner
        title="some title"
        subtitle="some subtitle"
        img="someUrl"
        buttonLabel="some button label"
        buttonLink="some button link"
        ribbon="My Ribbon"
        ribbonSize="small"
        ribbonColor="secondary"
      />
    )
    const ribbon = screen.getByText(/My Ribbon/i)

    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({
      backgroundColor: '#3CD3C1'
    })

    expect(ribbon).toHaveStyle({
      height: '2.6rem',
      fontSize: '1.2rem'
    })
  })
})
