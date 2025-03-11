import PlaylistCard from '@/components/common/PlaylistCard'
import { AppConstantRoutes } from '@/services/routes/path'
import { useNavigate } from 'react-router'

interface CardListProps {
  songLists: {
    id: string
    image: string
    title: string
    description: string 
    songSrc?: string
  }[]
  title: string
}

const CardList: React.FC<CardListProps> = ({ songLists, title }) => {
  const navigate = useNavigate()
  return (
    <div className=''>
      <div className='flex flex-row justify-between items-center p-4 text-white'>
        <h1 className='font-bold text-2xl hover:underline'>{title}</h1>
        <span className='text-md text-gray-300 hover:underline'>Show all</span>
      </div>
      <div>
        <ul className='flex flex-row gap-10 p-4  ' >
          {songLists.map((songList, index) => (
            <PlaylistCard
              key={index}
              className='w-full'
              image={songList.image}
              title={songList.title}
              description={songList.description}
              onClick={() => navigate(AppConstantRoutes.paths.songDetailPage(songList.id))}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Home = () => {
  const playlists = [
    {
      id: '1',
      image: 'https://i.scdn.co/image/ab67616d0000b27336032cb4acd9df050bc2e197',
      title: 'APT',
      description: 'Rose, BrunoMars',
      songSrc: '/audio/APT.mp3',
    },
    {
      id: '2',
      image:
        'https://upload.wikimedia.org/wikipedia/en/0/0b/JustinBieberLoveYourself.png',
      title: 'Love Yourself',
      description: 'Justin Bieber',
      songSrc: '/audio/LoveYourself.mp3',
    },
    {
      id: '3',
      image: 'https://i.scdn.co/image/ab67616d0000b2735a039ed450d3e9a5caaf7818',
      title: 'Moonlist Floor',
      description: 'Lisa',
      songSrc: '/audio/MoonlistFloor.mp3',
    },
  ]

  return (
    // <div className='flex flex-col h-screen relative fade-in '>
    //   <div className='bg-gradient-to-b from-[#121212] to-[#00000099] h-[35%] w-full'></div>
    //   <div className='bg-[#3333] w-full h-[65%]'></div>
    //   <div className='absolute  left-0 right-0 m-5'>
    //     <CardList playlists={playlists} title='Focus' />
    //     <CardList playlists={playlists} title='Chill' />
    //   </div>
    // </div>
    <div className='flex flex-col relative fade-in '>
      <div className=' h-full'>
        <CardList songLists={playlists} title='Focus' />
        <CardList songLists={playlists} title='Chill' />
      </div>
    </div>
  )
}

export default Home
