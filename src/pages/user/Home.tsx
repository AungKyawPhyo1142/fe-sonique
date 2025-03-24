import PlaylistCard from '@/components/common/PlaylistCard'
import { apiClient } from '@/services/network/apiClient'
import { Artist } from '@/services/network/lib/artist'
import { ApiConstantRoutes } from '@/services/network/path'
import { AppConstantRoutes } from '@/services/routes/path'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

interface CardListProps {
  songLists: {
    artist: Artist
    audioUrl: string
    coverImageUrl: string
    duration: number
    genre: string
    id: string
    title: string
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
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4'>
          {songLists.map((songList, index) => (
            <div key={index} className='w-full'>
              {' '}
              {/* Wrap in a div to maintain spacing */}
              <PlaylistCard
                image={songList.coverImageUrl}
                title={songList.title}
                description={songList.artist.name}
                onClick={() =>
                  navigate(AppConstantRoutes.paths.songDetailPage(songList.id))
                }
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Home = () => {
  const fetchSongs = async ({ pageParam = '' }) => {
    const response = await apiClient.get(
      ApiConstantRoutes.paths.auth.getAllSongs(pageParam),
    )

    return response.data
  }
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['getAllSongs'],
    queryFn: ({ pageParam = '' }) => fetchSongs({ pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
  console.log('data', data)
  console.log('data.pages', data?.pages)
  const songs = data?.pages?.flatMap((page) => page.songs ?? []) ?? []

  console.log('songs', songs)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
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
        {songs && <CardList songLists={songs} title='All Songs' />}
      </div>
    </div>
  )
}

export default Home
