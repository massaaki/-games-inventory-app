import { fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard, { GameCardProps } from '.'

const props: GameCardProps = {
  title: 'Some title',
  developer: 'Some developer',
  img: 'imgUrl',
  price: 'R$100'
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    //Renderizar o gamecard
    renderWithTheme(<GameCard {...props} />)

    //verifique se o title foi renderizado
    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()

    // verifique se o developer foi renderizado
    expect(
      screen.getByRole('heading', { name: props.developer })
    ).toBeInTheDocument()

    // verifique se a imagem foi renderizada
    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img
    )

    // verifique se o preço for renderizado
    expect(screen.getByText(props.price)).toBeInTheDocument()

    expect(screen.getByLabelText(/Add to Wishlist/i))
  })

  it('should render price in label', () => {
    //renderizar o componente
    renderWithTheme(<GameCard {...props} />)

    //preco nao tenha o line-throw
    expect(screen.getByText(props.price)).not.toHaveStyle({
      'text-decoration': 'line-through'
    })

    //preço tenha o background secundário
    expect(screen.getByText(props.price)).toHaveStyle({
      'background-color': '#3CD3C1'
    })
  })

  it('should render a line-through in price when promotional', () => {
    //renderizar o componente com promotional price // defaultPrice reais e promotionaPrice reais
    renderWithTheme(<GameCard {...props} promotionalPrice="R$ 50,00" />)

    //preco  tenha o line-through (defaultPrice)
    expect(screen.getByText(props.price)).toHaveStyle({
      'text-decoration': 'line-through'
    })

    //o promotionaPrice nao vai ter o line-through
    expect(screen.getByText('R$ 50,00')).not.toHaveStyle({
      'text-decoration': 'line-through'
    })
  })

  it('should render a field favorite icon when favorite is true', () => {
    renderWithTheme(<GameCard {...props} favorite />)

    expect(screen.getByLabelText(/Remove from Wishlist/i))
  })

  it('should call onFav method when favorite is clicked', () => {
    //criar um spy para informar quando o objeto foi chamado
    const onFav = jest.fn()

    renderWithTheme(<GameCard {...props} favorite onFav={onFav} />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(onFav).toBeCalled()
  })

  it('it should render a Ribbon', () => {
    renderWithTheme(
      <GameCard
        {...props}
        ribbon="My Ribbon"
        ribbonSize="small"
        ribbonColor="primary"
      />
    )
    const ribbon = screen.getByText(/My Ribbon/i)

    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({
      backgroundColor: '#F231A5'
    })

    expect(ribbon).toHaveStyle({
      height: '2.6rem',
      fontSize: '1.2rem'
    })
  })
})
