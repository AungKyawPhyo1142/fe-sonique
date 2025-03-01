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
      image: 'https://i.scdn.co/image/ab67616d0000b27341e573a7c64c749968494c25',
      year: 'Mar 1989',
      time: '5:42',
      icon: true,
    },
    {
      id: 2,
      title: 'Bohemian Rhapsody',
      image: 'https://i.scdn.co/image/ab67616d0000b2734493f1852a4f4e9522108b92',
      year: 'Oct 1975',
      time: '5:55',
      icon: false,
    },
    {
      id: 3,
      title: 'Billie Jean',
      image: 'https://i.scdn.co/image/ab67616d0000b2730129752c0029b53d04342571',
      year: 'Jan 1983',
      time: '4:54',
      icon: true,
    },
    {
      id: 4,
      title: 'Smells Like Teen Spirit',
      image: 'https://i.scdn.co/image/ab67616d0000b2734f66551b8a92025350c95d83',
      year: 'Sep 1991',
      time: '5:01',
      icon: false,
    },
    {
      id: 5,
      title: 'Imagine',
      image: 'https://i.scdn.co/image/ab67616d0000b2736417537b9804b321115b9338',
      year: 'Oct 1971',
      time: '3:03',
      icon: true,
    },
    {
      id: 6,
      title: 'Hey Jude',
      image: 'https://i.scdn.co/image/ab67616d0000b27365691456d61076f78a70669b',
      year: 'Aug 1968',
      time: '7:11',
      icon: false,
    },
    {
      id: 7,
      title: 'Rolling in the Deep',
      image: 'https://i.scdn.co/image/ab67616d0000b273f08b313b29c15431696f8c70',
      year: 'Nov 2010',
      time: '3:48',
      icon: true,
    },
    {
      id: 8,
      title: 'Hotel California',
      image: 'https://i.scdn.co/image/ab67616d0000b273c5289f64923e3518e3885d53',
      year: 'Feb 1977',
      time: '6:30',
      icon: false,
    },
    {
      id: 9,
      title: 'Purple Rain',
      image: 'https://i.scdn.co/image/ab67616d0000b2736a591e9f45604164b1979435',
      year: 'Sep 1984',
      time: '8:41',
      icon: true,
    },
    {
      id: 10,
      title: 'What a Wonderful World',
      image: 'https://i.scdn.co/image/ab67616d0000b2734293e50669375e816a2416f4',
      year: 'Aug 1967',
      time: '2:21',
      icon: false,
    },
  ]

  return (
    <div className='w-full'>
      {/* Search Bar */}
      <SearchBar />

      {/* Page Content */}
      <div className='flex flex-col items-start p-4 text-[#adadad] bg-[#181818] '>
        <h1 className='text-5xl font-bold'>
          {decodeURIComponent(title || 'Music Type')}
        </h1>
        <p className='text-lg mt-4'>
          Explore the best {decodeURIComponent(title)} tracks!
        </p>
      </div>

      {/* Music Cards Section */}
      <div className='p-4 bg-[#121212]'>
        <h2 className='text-3xl font-bold text-white mb-4'>Best Episodes</h2>
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
  )
}

export default MusictypePage
