import { render, screen } from '@testing-library/react'

import TesteC from '.'

describe('<TesteC />', () => {
it('should render the heading', () => {
const { container } = render(
<TesteC />)

expect(screen.getByRole('heading', { name: /TesteC/i })).toBeInTheDocument()

expect(container.firstChild).toMatchSnapshot()
})
})
