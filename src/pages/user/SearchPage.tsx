import React from 'react'
import Sidebar from '@/components/navbar/Sidebar'
import SearchBar from '@/components/common/SearchBar'
import MusictypeCard from '@/components/common/MusictypeCard' // Ensure this path is correct

const titles = ['Hip-Hop', 'Pop', 'Country', 'Latin', 'Rock', 'R&B']
const getRandomHexColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return `#${randomColor.padStart(6, '0')}`
}

const images = [
  '/images/music.png',
  '/images/playlist.png',
  '/images/playlist2.png',
]

const getRandomItem = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]

const musicCategories = titles.map((title) => ({
  title,
  color: getRandomHexColor(),
  image: getRandomItem(images),
}))

const SearchPage: React.FC = () => {
  return (
    <div className='flex h-screen  bg-[#302f2f]'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-1 ml-[240px]'>
        {/* Search Bar */}
        <div className='sticky top-0 z-50'>
          <SearchBar />
        </div>

        {/* Browse Section */}
        <h1 className='text-2xl font-bold text-white my-5 ms-5'>Browse all</h1>

        {/* Grid of Music Categories */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5 bg-[#302f2f]'>
          {musicCategories.map((category, index) => (
            <MusictypeCard
              key={index}
              title={category.title}
              color={category.color}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
