import { Story, Meta } from '@storybook/react/types-6-0'
import Dropdown, { DropdownType } from '.'

export default {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story<DropdownType> = (args) => <Dropdown {...args} />
Default.args = {
  title: 'Click here',
  children: 'Content'
}
