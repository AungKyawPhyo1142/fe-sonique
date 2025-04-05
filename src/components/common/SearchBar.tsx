import { useEffect, useState } from 'react'
import Input from './Input'
import useDebounce from '@/helpers/useDebounce/useDebounce'
import { useGetAllSongs } from '@/services/network/lib/songs'

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debounceSearchInput = useDebounce(searchQuery, 500)

  const [isTyping, setIsTyping] = useState(false)

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
        <div className='absolute w-full text-zinc-400 border-1 border-zinc-200/300 bg-zinc-700/10 overflow-auto backdrop-blur-2xl rounded-md shadow-md mt-2 z-10'>
          {isTyping || isFetching ? (
            <div className='p-2'>Loading...</div>
          ) : songResult ? (
            <ul>
              {songs.map((song) => (
                <li
                  key={song.id}
                  className='p-2 cursor-pointer select-none transition-colors duration-150 ease-in-out border-b border-zinc-200/300 hover:text-white'
                >
                  {song.title}
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
