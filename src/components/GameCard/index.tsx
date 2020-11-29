import * as S from './styles'
import { FavoriteBorder } from '@styled-icons/material/FavoriteBorder'
import { Favorite } from '@styled-icons/material-outlined/Favorite'
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'
import Button from 'components/Button'
import Ribbon, {
  RibbonColors,
  RibbonProps,
  RibbonSizes
} from 'components/Ribbon'

export type GameCardProps = {
  title: string
  developer: string
  img: string
  price: string
  promotionalPrice?: string
  favorite?: boolean
  ribbon?: React.ReactNode
  ribbonSize?: RibbonSizes
  ribbonColor?: RibbonColors
  onFav?: () => void
}

const GameCard = ({
  title,
  developer,
  img,
  price,
  promotionalPrice,
  favorite = false,
  ribbon,
  ribbonColor,
  ribbonSize = 'small',
  onFav
}: GameCardProps) => (
  <S.Wrapper>
    <S.ImageBox>
      {!!ribbon && !!ribbonColor && ribbonSize && (
        <Ribbon color={ribbonColor} size={ribbonSize}>
          {ribbon}
        </Ribbon>
      )}
      <img src={img} alt={title} />
    </S.ImageBox>
    <S.Content>
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.Developer>{developer}</S.Developer>
      </S.Info>
      <S.FavButton role="button" onClick={onFav}>
        {favorite ? (
          <Favorite aria-label="Remove from Wishlist" />
        ) : (
          <FavoriteBorder aria-label="Add to Wishlist" />
        )}
      </S.FavButton>

      <S.BuyBox>
        {!!promotionalPrice && <S.Price isPromotional>{price}</S.Price>}
        <S.Price>{promotionalPrice || price}</S.Price>
        <Button icon={<AddShoppingCart />} size="small" />
      </S.BuyBox>
    </S.Content>
  </S.Wrapper>
)

export default GameCard
