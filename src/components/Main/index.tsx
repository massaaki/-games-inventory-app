import * as S from './styles'

const Main = ({
  title = 'Next Boilerplate',
  description = 'Typescript - Eslint/Prettier - Husky - Lint Staged - Jest'
}) => {
  return (
    <S.Wrapper>
      <S.Logo
        src="/img/logo-next.svg"
        alt="Imagem de um átomo e React Avançado escrito ao lado."
      />

      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>

      <S.Illustraiton src="/img/hero-illustration.svg" />
    </S.Wrapper>
  )
}

export default Main
