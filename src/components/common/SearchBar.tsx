import { useEffect, useState } from 'react'
import Input from './Input'
import useDebounce from '@/helpers/useDebounce/useDebounce'
import { useGetAllSongs } from '@/services/network/lib/songs'
import { useNavigate } from 'react-router'
import { AppConstantRoutes } from '@/services/routes/path'

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debounceSearchInput = useDebounce(searchQuery, 500)

  const [isTyping, setIsTyping] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchQuery) {
      setIsTyping(true)
      const timeout = setTimeout(() => {
        setIsTyping(false)
      }, 500)

      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [searchQuery])

  const { data, isFetching } = useGetAllSongs(debounceSearchInput)
  const songs = data?.pages?.flatMap((page) => page.data.songs) || []
  const songResult = debounceSearchInput && songs.length > 0

  return (
    <div className='relative w-[400px]'>
      <Input
        type='text'
        placeholder='What do you want to listen to?'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='px-13 py-2 placeholder:text-[14px] !w-[400px]'
        showSearchIcon={true}
      />
      {searchQuery && (
        <div className='absolute w-full text-zinc-400 border-1 border-zinc-200/300 bg-zinc-700/10 overflow-auto  rounded-md shadow-md mt-2 z-10'>
          {isTyping || isFetching ? (
            <div className='p-2'>Loading...</div>
          ) : songResult ? (
            <ul>
              {songs.map((song) => (
                // <li
                //   key={song.id}
                //   className='p-2 cursor-pointer select-none transition-colors duration-150 ease-in-out border-b last:border-b-0 border-zinc-200/300 hover:text-white'
                // >
                //   {song.title}
                // </li>
                <li
                  key={song.id}
                  className='p-4 cursor-pointer select-none bg-zinc-900/80 transition-colors duration-150 ease-in-out border-b last:border-b-0 border-zinc-200/300 hover:text-white backdrop-blur-3xl'
                  onClick={() =>
                    navigate(AppConstantRoutes.paths.songDetailPage(song.id))
                  }
                >
                  <div className='flex flex-row items-center justify-start space-x-1'>
                    <img
                      src={song.coverImageUrl}
                      alt={song.title}
                      className='w-[40px] h-[40px] rounded-sm'
                    /> 
                    <div className='flex flex-col items-start justify-center'>
                      <h1 className='text-[18px] font-bold leading-none'>
                        {song.title}
                      </h1>
                      <div className='text-[15px] flex flex-row items-center justify-start space-x-1'>
                        <span>by {song.artist.name}</span>
                        <div className='rounded-full bg-zinc-400 hover:bg-white w-1 h-1'></div>
                        <span>@{song.artist.username}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='p-2'>No data</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
