import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Song, useGetAllSongs } from '@/services/network/lib/songs'
import useDebounce from '@/helpers/useDebounce/useDebounce'

// Card Component
interface SongCardsProps {
  song: Song
  addCard: (song: Song) => void
}

const SongListCards: React.FC<SongCardsProps> = ({ song, addCard }) => {
  return (
    <div
      className='cursor-pointer hover:bg-black/50 rounded-[10px] p-4 transition transform duration-300'
      onClick={() => addCard(song)}
    >
      <img
        src={song.coverImageUrl}
        alt={song.title}
        className='w-full h-36 object-cover rounded-[10px]'
      />
      <p className='text-[16px] font-light mt-1 text-center text-[#FFFFFF]/50'>
        {song.title}
      </p>
    </div>
  )
}

// Main Component
interface SongListProps {
  playlistSongs: Song[]
  onAdd: (song: Song) => void
}

export const SongList: React.FC<SongListProps> = ({ playlistSongs, onAdd }) => {
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 500)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (search) {
      setIsTyping(true)
      const timeout = setTimeout(() => {
        setIsTyping(false)
      }, 500)

      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [search])
  const isSearching = debounceSearch.trim().length > 0

  // Fetch all songs (default view)
  const { data: allData, isFetching: isFetchingAll } = useGetAllSongs()

  // Fetch filtered songs when searching
  const { data: filteredData, isFetching: isFetchingFiltered } =
    useGetAllSongs(debounceSearch)

  // Pick data based on user input
  const rawSongs = isSearching
    ? filteredData?.pages?.flatMap((page) => page.data.songs) || []
    : allData?.pages?.flatMap((page) => page.data.songs) || []

  const isFetching = isSearching ? isFetchingFiltered : isFetchingAll

  const availableSongs = rawSongs.filter(
    (song) => !playlistSongs.some((s) => s.id === song.id),
  )

  return (
    <div className='p-4 max-h-[800px] border-r border-[#FFFFFF]/30'>
      {/* Search Input */}
      <div className='flex flex-row mb-4 text-[#FFFFFF] border rounded-[10px]'>
        <Search className='m-[5px] mx-3' size={30} />
        <input
          type='text'
          placeholder='Search songs...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full font-light text-[18px] outline-none pl-[14px] border-l-2 bg-transparent'
        />
      </div>

      {/* Section Title */}
      <h2 className='text-[20px] font-bold mb-[25px] pl-3 text-white'>
        Select the songs for your playlist
      </h2>

      {/* Loading or Empty State */}
      {isTyping || isFetching ? (
        <h2 className='pl-3 text-[40px] font-bold text-white'>
          Loading songs...
        </h2>
      ) : availableSongs.length === 0 ? (
        <h2 className='pl-3 text-[40px] font-bold text-white'>
          No songs found.
        </h2>
      ) : (
        <div className='grid grid-cols-3 gap-[8px] px-3 overflow-y-auto pr-3 max-h-[550px]'>
          {availableSongs.map((song) => (
            <SongListCards key={song.id} song={song} addCard={onAdd} />
          ))}
        </div>
      )}
    </div>
  )
}
