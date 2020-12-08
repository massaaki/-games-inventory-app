import { Story, Meta } from '@storybook/react/types-6-0'
import GameDetails, { GameDetailsProps } from '.'

export default {
  title: 'Game/GameDetails',
  component: GameDetails,
  args: {
    platforms: ['windows', 'linux', 'mac']
  },
  argTypes: {
    platforms: {
      control: {
        type: 'inline-check',
        options: ['windows', 'linux', 'mac']
      }
    }
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story<GameDetailsProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <GameDetails {...args} />
  </div>
)
