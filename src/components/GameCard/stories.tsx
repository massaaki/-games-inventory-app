import { Story, Meta } from '@storybook/react/types-6-0'
import GameCard, { GameCardProps } from '.'

export default {
  title: 'GameCard',
  component: GameCard,
  args: {
    title: 'Populartion Zero',
    developer: 'Rockstar Games',
    img: '/img/red-dead-img.jpg',
    price: 'R$ 200,00',
    promotionalPrice: 'R$ 100,00'
  },
  argTypes: {
    onFav: { action: 'clicked!' }
  },
  parameters: {
    backgrounds: { default: 'won-dark' }
  }
} as Meta

export const Default: Story<GameCardProps> = (args) => (
  <div style={{ width: '30rem' }}>
    <GameCard {...args} />
  </div>
)

export const WithRibbon: Story<GameCardProps> = (args) => (
  <div style={{ width: '30rem' }}>
    <GameCard {...args} />
  </div>
)
WithRibbon.args = {
  ribbon: '20% OFF',
  ribbonSize: 'small',
  ribbonColor: 'primary'
}
