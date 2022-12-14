import {skipToken} from '@reduxjs/toolkit/dist/query'
import {NextSeo} from 'next-seo'
import {GetStaticProps} from 'next'
import {ArrowRightIcon} from '@heroicons/react/outline'
import {useState} from 'react'
import DataTable from '../../components/ui/DataTable'
import SearchForm from '../../components/ui/SearchForm'
import {useGetReviewsQuery} from '../../store/api/reviewsApiSlice'
import {timeAgo} from '../../utils/timeAgo'
import StarRating from '../../components/ui/StarRating'

const css = {
  title: 'text-xl sm:text-2xl md:text-3xl uppercase font-medium mb-6 sm:mb-8 md:mb-10',
  actionIcon: 'w-6 text-gray-400 group-hover:text-orange-600',
  stars: 'flex items-center [&_svg]:w-4',
  searchForm: 'mb-10 sm:mb-12',
  body: '',
}

const STRUCTURE = [
  {
    title: 'Rating',
    selector: (r: any) => (
      <div className={css.stars}>
        <StarRating rating={r.rating} />
      </div>
    ),
    className: 'col-span-2',
    isBold: true,
  },
  {
    title: 'User',
    selector: (r: any) => r.user.name,
    className: 'col-span-2',
    isBold: true,
  },
  {
    title: 'Created',
    selector: (r: any) => timeAgo(r.createdAt),
    className: 'col-span-2',
  },
  {
    title: 'Order ID',
    selector: (r: any) => (r.comment.length > 80 ? `${r.comment.slice(0, 80)}...` : r.comment),
    className: 'col-span-5 truncate',
  },
  {
    selector: (d: any) => <ArrowRightIcon className={css.actionIcon} />,
    className: 'justify-end',
  },
]

const QUERY_FILTER = {
  limit: 10,
  page: 1,
}

const AdminReviews = () => {
  const [productId, setProductId] = useState('')
  const {data, isLoading, isFetching, isError, error} = useGetReviewsQuery(productId || skipToken)
  const {reviews = []} = data || {}
  const showLoader = isLoading || isFetching

  const updateRoute = (value: string) => {
    setProductId(value)
  }

  return (
    <div>
      <NextSeo title="Product Reviews" />
      <h1 className={css.title}>Reviews</h1>
      <div>
        <SearchForm
          className={css.searchForm}
          onSubmitValue={updateRoute}
          label="Load reviews"
          placeholder="Enter product ID..."
        />
        {productId && !isError && reviews?.length > 0 ? (
          <DataTable
            isLoading={showLoader}
            skeletons={QUERY_FILTER.limit}
            basePath="/admin/reviews"
            data={reviews as any}
            structure={STRUCTURE}
          />
        ) : (
          <>{productId && (error as any)?.data?.message}</>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      withAuth: true,
      userRoles: ['admin'],
    },
  }
}

export default AdminReviews
