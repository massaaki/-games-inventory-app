import 'media-media-mock'
import { render, screen } from '@testing-library/react'

import Slider from '.'

describe('<Slider />', () => {
  it('should render the heading', () => {
    const { container } = render(
      <Slider settings={{ slidesToShow: 1, infinite: false }}>
        <p>Item1</p>
        <p>Item2</p>
      </Slider>
    )

    expect(screen.getByText(/Item1/i).parentElement?.parentElement).toHaveClass(
      'slick-slide'
    )

    expect(screen.getByText(/Item2/i).parentElement?.parentElement).toHaveClass(
      'slick-slide'
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
