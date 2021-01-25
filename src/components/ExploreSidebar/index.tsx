import { useState } from 'react'

import Heading from 'components/Heading'
import Checkbox from 'components/Checkbox'
import Radio from 'components/Radio'
import Button from 'components/Button'

import * as S from './styles'

export type ItemProps = {
  title: string
  name: string
  type: string
  fields: Field[]
}

type Field = {
  label: string
  name: string
}

type Values = {
  [field: string]: boolean | string //string definition - define uma propriedade dinamica
}

export type ExploreSidebarProps = {
  items: ItemProps[]
  initialValues?: Values
  onFilter: (values: Values) => void
}

const ExploreSidebar = ({
  items,
  onFilter,
  initialValues = {}
}: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (name: string, value: string | boolean) => {
    setValues((s) => ({
      ...s,
      [name]: value
    }))
  }

  const handleFilter = () => {
    onFilter(values)
  }

  return (
    <S.Wrapper>
      {items.map((item) => (
        <div key={item.title}>
          <Heading lineBottom lineColor="secondary" color="white" size="small">
            {item.title}
          </Heading>

          {item.type === 'checkbox' &&
            item.fields.map((field) => (
              <Checkbox
                key={field.name}
                name={field.name}
                label={field.label}
                labelFor={field.name}
                isChecked={!!values[field.name]}
                onCheck={(v) => handleChange(field.name, v)}
              />
            ))}

          {item.type === 'radio' &&
            item.fields.map((field) => (
              <Radio
                key={field.name}
                id={field.name}
                name={item.name}
                label={field.label}
                labelFor={field.name}
                value={field.name}
                defaultChecked={field.name === values[item.name]}
                onChange={() => handleChange(item.name, field.name)}
              />
            ))}
        </div>
      ))}

      <Button fullWidth size="medium" onClick={handleFilter}>
        Filter
      </Button>
    </S.Wrapper>
  )
}

export default ExploreSidebar
