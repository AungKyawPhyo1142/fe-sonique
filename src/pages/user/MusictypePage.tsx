import SearchBar from '@/components/common/SearchBar'
import PodcastsCard from '@/components/common/PodcastsCard'
import React from 'react'
import { useParams } from 'react-router'

const MusictypePage: React.FC = () => {
  const { title = '' } = useParams<{ title?: string }>()

  const podcasts = [
    {
      id: 1,
      title: 'Like a Prayer',
      image: 'https://picsum.photos/200/200',
      year: 'Mar 1989',
      time: '5:42',
      icon: true,
    },
    {
      id: 2,
      title: 'Bohemian Rhapsody',
      image: 'https://picsum.photos/200/200',
      year: 'Oct 1975',
      time: '5:55',
      icon: false,
    },
    {
      id: 3,
      title: 'Billie Jean',
      image: 'https://picsum.photos/200/200',
      year: 'Jan 1983',
      time: '4:54',
      icon: true,
    },
    {
      id: 4,
      title: 'Smells Like Teen Spirit',
      image: 'https://picsum.photos/200/200',
      year: 'Sep 1991',
      time: '5:01',
      icon: false,
    },
    {
      id: 5,
      title: 'Imagine',
      image: 'https://picsum.photos/200/200',
      year: 'Oct 1971',
      time: '3:03',
      icon: true,
    },
    {
      id: 6,
      title: 'Hey Jude',
      image: 'https://picsum.photos/200/200',
      year: 'Aug 1968',
      time: '7:11',
      icon: false,
    },
    {
      id: 7,
      title: 'Rolling in the Deep',
      image: 'https://picsum.photos/200/200',
      year: 'Nov 2010',
      time: '3:48',
      icon: true,
    },
    {
      id: 8,
      title: 'Hotel California',
      image: 'https://picsum.photos/200/200',
      year: 'Feb 1977',
      time: '6:30',
      icon: false,
    },
    {
      id: 9,
      title: 'Purple Rain',
      image: 'https://picsum.photos/200/200',
      year: 'Sep 1984',
      time: '8:41',
      icon: true,
    },
    {
      id: 10,
      title: 'What a Wonderful World',
      image: 'https://picsum.photos/200/200',
      year: 'Aug 1967',
      time: '2:21',
      icon: false,
    },
  ]

  return (
    <div className='fade-in flex flex-col py-5'>
      {/* Search Bar */}
      <div className='place-self-end px-5'>
        <SearchBar />
      </div>

      {/* Page Content */}
      <div>
        <div className='flex flex-col items-start p-4 text-[#adadad] '>
          <h1 className='text-8xl font-bold'>
            {decodeURIComponent(title || 'Music Type')}
          </h1>
          <p className='text-lg mt-4'>
            Explore the best {decodeURIComponent(title)} tracks!
          </p>
        </div>

        {/* Music Cards Section */}
        <div className='p-4 mt-5'>
          <p className='text-3xl font-bold text-white mb-4 text-[20px]  hover:underline hover:cursor-pointer'>
            Best Playlist
          </p>
          <div className='grid grid-cols-5 gap-4'>
            {podcasts.map((podcast) => (
              <PodcastsCard
                key={podcast.id}
                title={podcast.title}
                image={podcast.image}
                year={podcast.year}
                time={podcast.time}
                icon={podcast.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusictypePage
