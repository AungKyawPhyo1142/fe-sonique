import PlaylistCard from '@/components/common/PlaylistCard'

interface CardListProps {
  playlists: {
    image: string
    title: string
    description: string
  }[]
  title: string
}

const CardList: React.FC<CardListProps> = ({ playlists, title }) => {
  return (
    <div className='p-5  my-3'>
      <div className='flex flex-row justify-between items-center p-4 text-white'>
        <h1 className='font-bold text-2xl hover:underline'>{title}</h1>
        <span className='text-md text-gray-300 hover:underline'>Show all</span>
      </div>
      <div className=''>
        <ul className='flex flex-row gap-10 p-4  '>
          {playlists.map((playlist, index) => (
            <PlaylistCard
              key={index}
              className='w-full'
              image={playlist.image}
              title={playlist.title}
              description={playlist.description}
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
      image: 'https://picsum.photos/200/200',
      title: 'Focus',
      description: 'Lorem ipsum dolor sit amet',
    },
    {
      image: 'https://picsum.photos/200/200',
      title: 'Chill',
      description: 'Consectetur adipiscing elit',
    },
    {
      image: 'https://picsum.photos/200/200',
      title: 'Workout',
      description: 'Sed do eiusmod tempor',
    },
    {
      image: 'https://picsum.photos/200/200',
      title: 'Party',
      description: 'Incididunt ut labore et dolore',
    },
  ]

  return (
    <div className='flex flex-col h-screen relative fade-in'>
      <div className='bg-gradient-to-b from-[#121212] to-[#00000099] h-[35%] w-full'></div>
      <div className='bg-[#3333] w-full h-[65%]'></div>
      <div className='absolute  left-0 right-0 m-5'>
        <CardList playlists={playlists} title='Focus' />
        <CardList playlists={playlists} title='Chill' />
      </div>
    </div>
  )
}

export default Home
