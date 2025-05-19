import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useCustomEvents } from '@/services/formik/hooks'
import { songRequests } from '@/services/network/lib/songs'
import { useFormik } from 'formik'
import { object, string } from 'yup'

export interface CreateGenreFormValues {
  name: string
}

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => void
}

const CreateGenreModalContent: React.FC<Props> = ({
  setModalOpen,
  refetch,
}) => {
  const initialValues = {
    name: '',
  }

  const validationSchema = object().shape({
    name: string().required('Genre Name is required'),
  })

  const onSubmit = async (val: CreateGenreFormValues) => {
    try {
      const res = await songRequests.createNewGenre(val)
      console.log('API resopnse for create gen: ', res)

      if (res && res.status === 'SUCCESS') {
        console.log(res)
        refetch()
        setModalOpen(false)
      } else {
        formik.setErrors({ name: 'Failed to create genre. Please try again.' })
      }
    } catch (error) {
      console.error('API Error:', error)
      formik.setErrors({ name: 'An error occurred while creating the genre' })
    }
  }

  const formik = useFormik<CreateGenreFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  })

  const { onInputChange } = useCustomEvents<CreateGenreFormValues>(formik)

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=' w-full flex flex-col gap-y-5'
    >
      <Input
        placeholder='Genre Name'
        name='name'
        value={formik.values.name}
        error={formik.errors.name}
        onChange={onInputChange}
      />
      <div className='w-full flex justify-end'>
        <Button
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
          primary
          className='px-[30px] py-2'
          type='submit'
        >
          Create
        </Button>
      </div>
    </form>
  )
}

export default CreateGenreModalContent
