import InfiniteScrollContainer from '@/components/common/InfiniteScrollContainer'
import PlaylistCard from '@/components/common/PlaylistCard'
import { Song, useGetAllSongs } from '@/services/network/lib/songs'

import { AppConstantRoutes } from '@/services/routes/path'

import { useNavigate } from 'react-router'

interface CardListProps {
  songLists: Song[]
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

      <div className='w-full grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-greem '>
        {songLists.map((songList, index) => (
          <div key={index} className='w-full'>
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
      </div>
    </div>
  )
}

const Home = () => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useGetAllSongs()

  console.log('data', data)
  console.log('data.pages', data?.pages)
  const songs = data?.pages?.flatMap((page) => page.data.songs ?? []) ?? []

  console.log('songs', songs)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <div className='flex flex-col relative fade-in '>
      <div className=' h-full flex flex-col gap-y-10'>
        {songs && (
          <InfiniteScrollContainer onBottomReached={() => fetchNextPage()}>
            <CardList songLists={songs} title='All Songs' />
          </InfiniteScrollContainer>
        )}
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  )
}

export default Home
