import { render, screen, fireEvent } from 'utils/test-utils'

import GameCard, { GameCardProps } from '.'

const props: GameCardProps = {
  id: '1',
  slug: 'populartion-zero',
  title: 'Some title',
  developer: 'Some developer',
  img: 'imgUrl',
  price: 100
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    //Renderizar o gamecard
    render(<GameCard {...props} />)

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
    expect(screen.getByText('$100.00')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: props.title })).toHaveAttribute(
      'href',
      `/game/${props.slug}`
    )

    expect(screen.getByLabelText(/Add to Wishlist/i))
  })

  it('should render price in label', () => {
    //renderizar o componente
    render(<GameCard {...props} />)

    //preco nao tenha o line-throw
    expect(screen.getByText('$100.00')).not.toHaveStyle({
      'text-decoration': 'line-through'
    })

    //preço tenha o background secundário
    expect(screen.getByText('$100.00')).toHaveStyle({
      'background-color': '#3CD3C1'
    })
  })

  it('should render a line-through in price when promotional', () => {
    //renderizar o componente com promotional price // defaultPrice reais e promotionaPrice reais
    render(<GameCard {...props} promotionalPrice={50} />)

    //preco  tenha o line-through (defaultPrice)
    expect(screen.getByText('$100.00')).toHaveStyle({
      'text-decoration': 'line-through'
    })

    //o promotionaPrice nao vai ter o line-through
    expect(screen.getByText('$50.00')).not.toHaveStyle({
      'text-decoration': 'line-through'
    })
  })

  it('should render a field favorite icon when favorite is true', () => {
    render(<GameCard {...props} favorite />)

    expect(screen.getByLabelText(/Remove from Wishlist/i))
  })

  it('should call onFav method when favorite is clicked', () => {
    //criar um spy para informar quando o objeto foi chamado
    const onFav = jest.fn()

    render(<GameCard {...props} favorite onFav={onFav} />)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(onFav).toBeCalled()
  })

  it('it should render a Ribbon', () => {
    render(
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
