import Image from 'next/future/image'
import Link from 'next/link'
import {IImage} from '../../types/image'
import {numToPrice} from '../../utils/helpers'
import StarRating from '../ui/StarRating'

export interface IProductCardProps {
  _id: string
  name: string
  price: number
  ratings: number
  oldPrice: number
  images?: IImage[]
  numOfReviews: number
}

const css = {
  wrapper: '',
  link: 'group block max-w-sm mx-auto',
  media:
    'group-hover:opacity-75 duration-250 bg-gray-100 pt-[100%] relative rounded overflow-hidden',
  image: 'absolute inset-0 w-full h-full object-cover',
  body: 'mt-5 space-y-2',
  price: 'font-medium text-black flex items-center',
  oldPrice: 'line-through mr-4 text-gray-500',
  name: 'text-black truncate',
  ratings: 'flex items-center',
  stars: 'mr-2 flex items-center [&_svg]:w-4',
  reviews: 'text-sm text-gray-500',
}

const ProductCard = ({
  name,
  price,
  oldPrice,
  images,
  ratings,
  numOfReviews,
  _id,
}: IProductCardProps) => {
  const mainImageUrl = images?.[0]?.url

  return (
    <div className={css.wrapper}>
      <Link href={`/product/${_id}`}>
        <a className={css.link}>
          <div className={css.media}>
            <Image
              src={mainImageUrl as string}
              className={css.image}
              alt={name}
              width={320}
              height={320}
            />
          </div>
          <div className={css.body}>
            <div className={css.ratings}>
              <div className={css.stars}>
                <StarRating rating={ratings} hasHalfStars />
              </div>
              <span className={css.reviews}>
                ({numOfReviews} {numOfReviews === 1 ? 'Review' : 'Reviews'})
              </span>
            </div>
            <h3 className={css.name}>{name}</h3>
            <div className={css.price}>
              {Number(oldPrice) > 0 && <span className={css.oldPrice}>{numToPrice(oldPrice)}</span>}
              {<span>{numToPrice(price)}</span>}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ProductCard
