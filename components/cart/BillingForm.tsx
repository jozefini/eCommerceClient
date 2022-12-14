import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {ArrowNarrowRightIcon} from '@heroicons/react/outline'
import {addShippingInfo} from '../../store/slices/cartSlice'
import {useDispatch} from '../../store/store'
import {getLocalStorage} from '../../utils/helpers'
import Input from '../fields/Input'
import {DIR_PATHS} from '../../utils/constants'

interface IBillingFormProps {}

const css = {
  form: 'max-w-sm mx-auto',
  action: 'text-center',
  btn: 'mt-8 sm:mt-10 md:mt-12 inline-flex items-center justify-center h-10 sm:h-12 px-7 sm:px-10 text-sm uppercase font-medium bg-black text-white rounded hover:bg-gray-700 duration-150',
  btnIcon: 'ml-2 -mr-2 w-6',
  sectionTitle:
    'text-xl sm:text-2xl uppercase text-gray-500 pb-1 sm:pb-2 mb-4 sm:mb-6 border-b border-gray-200',
  fields: 'space-y-6',
}

const BillingForm = ({}: IBillingFormProps) => {
  const {push} = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({defaultValues: getLocalStorage('shippingInfo', {})})

  const storeFormData = (data: any) => {
    dispatch(addShippingInfo(data))
    push(`${DIR_PATHS.cart}/confirm`)
  }

  return (
    <form className={css.form} onSubmit={handleSubmit(storeFormData)}>
      <h3 className={css.sectionTitle}>Billing details</h3>
      <div className={css.fields}>
        <Input
          name="address"
          label="Address"
          placeholder="Your address"
          register={register}
          watch={watch}
          hints={{
            required: 'Address is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
        <Input
          name="city"
          label="City"
          placeholder="Your city"
          register={register}
          watch={watch}
          hints={{
            required: 'City is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
        <Input
          name="postalCode"
          label="Postal Code"
          placeholder="Your postal code"
          register={register}
          watch={watch}
          hints={{
            required: 'Postal Code is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
        <Input
          name="phoneNumber"
          label="Phone Number"
          placeholder="Your phone number"
          register={register}
          watch={watch}
          hints={{
            required: 'Phone number is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
        <Input
          name="country"
          label="Country"
          placeholder="Your country"
          register={register}
          watch={watch}
          hints={{
            required: 'Country is required',
          }}
          options={{
            required: true,
          }}
          errors={errors}
        />
      </div>
      <div className={css.action}>
        <button type="submit" className={css.btn}>
          Continue <ArrowNarrowRightIcon className={css.btnIcon} />
        </button>
      </div>
    </form>
  )
}

export default BillingForm
