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

const Example = () => {
  //Modal
  const [isModalOpen, setModalOpen] = useState(false)
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
        {/***/}
        <Button destructive onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title='Modal'
          content='It is Modal contents.'
          button
        />
      </div>
      {/**Playlist */}
      <div className='ml-[50px] p-5 bg-[#4e4d4d]'>
        <h1 className='text-2xl font-bold mb-6 text-white'>Playlist Card</h1>
        <div className='grid grid-cols-5 gap-6'>
          <PlaylistCard
            image='public/images/playlist.png'
            title='Piano playlist'
            description='It is a card description. Piano playlist is a example of playslist card.'
          />
          <PlaylistCard
            image='public/images/playlist2.png'
            title='Deep Focus'
            description='Keep calm and focus with ambient and post-rock music. Perfect for deep work and study sessions.'
          />
          <PlaylistCard
            image='public/images/music.png'
            title='Instrumental Study'
            description='Focus with soft study music in the background. Enhance your concentration and productivity.'
          />
          <PlaylistCard
            image='public/images/playlist2.png'
            title='Piano playlist'
            description='It is a card description. Piano playlist is a example of playslist card.'
          />
          <PlaylistCard
            image='public/images/playlist.png'
            title='Piano playlist'
            description='It is a card description. Piano playlist is a example of playslist card.'
          />
          <PlaylistCard
            image='public/images/playlist2.png'
            title='Jazz Vibes'
            description='The original chill instrumental beats playlist. Enjoy smooth jazz for a relaxing mood.'
          />
        </div>
        <h1 className='text-2xl font-bold mb-6 text-white'>Music Type Card</h1>
        <div className='grid grid-cols-5 gap-6'>
          <MusictypeCard image='public/images/music.png' title='Podcasts' />
          <MusictypeCard
            image='public/images/playlist.png'
            title='Audiobooks'
          />
          <MusictypeCard
            image='public/images/playlist2.png'
            title='Made For You'
          />
          <MusictypeCard image='public/images/music.png' title='Live Events' />
          <MusictypeCard image='public/images/playlist.png' title='Hip-Hop' />
          <MusictypeCard
            image='public/images/playlist2.png'
            title='New Releases'
          />
        </div>
        <h1 className='text-2xl font-bold mb-6 text-white'>Podcasts Card</h1>
        <div className='grid grid-cols-5 gap-6'>
          <PodcastsCard
            image='public/images/music.png'
            title="Every Parent's Nightmare"
            description='Sep 2002 . 36 Min'
          />
          <PodcastsCard
            image='public/images/playlist.png'
            title='After 10 years'
            description='Jul 2002 . 62 Min'
          />
          <PodcastsCard
            image='public/images/playlist2.png'
            title='Book Exploder: Min Jin Lee'
            description='Aug 2022 . 20 Min'
          />
          <PodcastsCard
            image='public/images/music.png'
            title='Healing Through Music v'
            description='Aug 2022 . 26 Min'
          />
          <PodcastsCard
            image='public/images/playlist.png'
            title='Piano playlist'
            description='It is a card description. Piano playlist is a example of playslist card.'
          />
          <PodcastsCard
            image='public/images/playlist2.png'
            title='Piano playlist'
            description='It is a card description. Piano playlist is a example of playslist card.'
          />
        </div>
      </div>
    </div>
  )
}

export default Example
