import Button from '@/components/common/Button'
import Checkbox from '@/components/common/Checkbox'
import ErrorContent from '@/components/common/ErrorContent'
import Input from '@/components/common/Input'
import Select, { ListBox } from '@/components/common/Select'
import { useState } from 'react'
import Modal from '@/components/common/Modal'
import PlaylistCard from '@/components/common/PlaylistCard'
import MusictypeCard from '@/components/common/MusictypeCard'
import PodcastsCard from '@/components/common/PodcastsCard'
import SearchBar from '@/components/common/SearchBar'
const Example = () => {
  //Modal
  const [isModalOpen, setModalOpen] = useState(false)
  // checkbox
  const [checkBoxValue, setCheckBoxValue] = useState(false)
  const onCheckboxChange = () => {
    setCheckBoxValue(!checkBoxValue)
  }

  //select
  const [selectList] = useState('')
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

  // const [selectedValue, setSelectedValue] = useState('')

  return (
    <div>
      <SearchBar />
      {/**
       * <div className='flex h-screen'>
       * <div className='w-60 fixed top-0 z-50 left-0 h-full'>
          <Sidebar />
        </div>
        <div className='flex-1 ml-60'>
          <div className='sticky top-0 z-50'>
            <SearchBar />
          </div>
        </div>
      </div>
       * 
       */}

      <Button loading={false} primary={true} className='text-red-400'>
        Example Button
      </Button>
      <div className='w-[300px] mt-5 flex flex-col gap-y-5'>
        <Input
          type='text'
          primary
          placeholder='Example primary'
          // hint='This is an example hint'
          // error='This is an example error'
        />
        <Input type='text' secondary placeholder='Example secondary' />
        <Input type='password' secondary placeholder='Example password' />
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
        <fieldset className='flex-col ml-5'>
          <label htmlFor='company' className='text-lg font-[600] text-white'>
            Company
          </label>
          <Select
            id='companyName'
            name='companyName'
            placeholder='Select a company'
            className='mt-5 w-full'
            listOption={someList}
            onSelected={() => {
              console.log('selected')
            }}
            value={selectList}
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
        <Button
          destructive
          className='mx-5 px-4 py-3 rounded-s-full rounded-e-full'
        >
          {' '}
          Destructive
        </Button>
        <Button outline>Outline</Button>
        {/***/}
        <Button destructive onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setModalOpen}
          title='Modal'
          content='It is Modal contents.'
          button
        />
      </div>
      {/**Playlist */}
      <div className='ml-[50px] p-5 bg-[#4e4d4d]'>
        <h1 className='text-2xl font-bold my-6 text-white'>Playlist Card</h1>
        <div className='grid grid-cols-5 gap-6'>
          <PlaylistCard
            image='/images/playlist.png'
            title='Piano playlist'
            description='It is a card description. Piano playlist is a example of playslist card.'
          />
          <PlaylistCard
            image='/images/playlist2.png'
            title='Deep Focus'
            description='Keep calm and focus with ambient and post-rock music. Perfect for deep work and study sessions.'
          />
          <PlaylistCard
            image='/images/music.png'
            title='Instrumental Study'
            description='Focus with soft study music in the background. Enhance your concentration and productivity.'
          />
          <PlaylistCard
            image='/images/playlist2.png'
            title='Piano playlist'
            description='It is a card description. Piano playlist is a example of playslist card.'
          />
          <PlaylistCard
            image='/images/playlist.png'
            title='Piano playlist'
            description='It is a card description. Piano playlist is a example of playslist card.'
          />
          <PlaylistCard
            image='/images/playlist2.png'
            title='Jazz Vibes'
            description='The original chill instrumental beats playlist. Enjoy smooth jazz for a relaxing mood.'
          />
        </div>
        <h1 className='text-2xl font-bold my-6 text-white'>Music Type Card</h1>
        <div className='grid grid-cols-5 gap-6'>
          <MusictypeCard
            image='/images/music.png'
            title='Podcasts'
            color={'#27856A'}
          />
          <MusictypeCard
            image='/images/playlist.png'
            title='Audiobooks'
            color={'#8D67AB'}
          />
          <MusictypeCard
            image='/images/playlist2.png'
            title='Made For You'
            color={'#7358FF'}
          />
          <MusictypeCard
            image='/images/music.png'
            title='Live Events'
            color={'#D7F27D'}
          />
          <MusictypeCard
            image='/images/playlist.png'
            title='Hip-Hop'
            color={'#283EA3'}
          />
          <MusictypeCard
            image='/images/playlist2.png'
            title='New Releases'
            color={'green'}
          />
        </div>
        <h1 className='text-2xl font-bold my-6 text-white'>Podcasts Card</h1>
        <div className='grid grid-cols-5 gap-6'>
          <PodcastsCard
            image='/images/music.png'
            title="Every Parent's Nightmare"
            year='Sep 2002'
            time='36 Min'
          />
          <div className='bg-red'>
            <PodcastsCard
              image='/images/playlist.png'
              title='After 10 years'
              year='Jul 2002'
              time='62 Min'
              icon
            />
          </div>
          <PodcastsCard
            image='/images/playlist2.png'
            title='Book Exploder: Min Jin Lee'
            year='Aug 2022'
            time='20 Min'
          />
          <PodcastsCard
            image='/images/music.png'
            title='Healing Through Music v'
            year='Aug 2022'
            time='26 Min'
            icon
          />
          <PodcastsCard
            image='/images/playlist.png'
            title='Piano playlist'
            year='Sep 2002'
            time='36 Min'
          />
          <PodcastsCard
            image='/images/playlist2.png'
            title='Piano playlist'
            year='Sep 2002'
            time='36 Min'
            icon
          />
        </div>
      </div>
    </div>
  )
}

export default Example
