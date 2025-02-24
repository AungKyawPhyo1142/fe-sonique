import Button from '@/components/common/Button'
import Checkbox from '@/components/common/Checkbox'
import ErrorContent from '@/components/common/ErrorContent'
import Input from '@/components/common/Input'
import Select, { ListBox } from '@/components/common/Select'
import { useState } from 'react'

const Example = () => {
  // checkbox
  const [checkBoxValue, setCheckBoxValue] = useState(false)
  const onCheckboxChange = () => {
    setCheckBoxValue(!checkBoxValue)
  }

  //select
  const someList: ListBox[] = [
    {
      label: 'Label 1',
      value: 'val1',
    },
    {
      label: 'Label 2',
      value: 'val2',
    },
    {
      label: 'Label 3',
      value: 'val3',
    },
  ]

  return (
    <div className='m-5 bg-black'>
      <Button loading={false} primary={true} className='text-red-400'>
        Example Button
      </Button>
      <div className='w-[300px] mt-5 flex flex-col gap-y-5'>
        <Input
          type='text'
          placeholder='Example Text'
          // hint='This is an example hint'
          // error='This is an example error'
        />
        <Input type='password' placeholder='Example Password' />
      </div>
      <div className='flex  mt-5'>
        <Checkbox
          id='terms'
          checked={checkBoxValue}
          onChange={onCheckboxChange}
          label='Terms & policies...'
        />
      </div>
      <div className='mt-5 w-[300px]'>
        <fieldset className='flex-col'>
          <label htmlFor='company' className='text-lg font-[600] text-white'>
            Company
          </label>
          <Select
            id='companyName'
            name='companyName'
            placeholder='Select a company'
            className='mt-2 w-full'
            value={'val'}
            listOption={someList}
            onSelected={(value) => console.log(value)}
          />
        </fieldset>
      </div>
      <div className='mt-5'>
        <ErrorContent
          reload={() => {
            console.log('reload')
          }}
        />
      </div>
      <div>
        <Button primary onClick={() => console.log('Clicked!')}>
          Primary Button
        </Button>
        <Button primary loading>
          Loading Button
        </Button>
        <Button secondary> Secondary </Button>
        <Button destructive> Destructive</Button>
        <Button outline>Outline</Button>
        {/**
        <Modal
          isOpen={true}
          onClose={() => {
            console.log('close')
          }}
          title='Registered successfully!'
          content="You've been registered successfully."
          button
        ></Modal>
         */}
      </div>
    </div>
  )
}

export default Example
