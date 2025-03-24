import GlassCard from '@/components/common/GlassCard'
import Player from '@/components/common/Player'
import clsx from 'clsx'
import { useParams } from 'react-router'

const SongDetail = () => {
  const { id } = useParams()
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
  const song = playlists.find((song) => song.id === id)

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Song Detail */}
      <div
        style={{ backgroundImage: `url(${song?.image})` }}
        className={clsx(
          `flex flex-col text-white items-center  justify-center h-[90vh] bg-cover bg-center bg-no-repeat `,
        )}
      >
        <GlassCard className='!rounded-none  flex flex-col items-center justify-center space-y-5 w-full h-full !backdrop-blur-md bg-black/50 text-white'>
          <div className='flex flex-row items-center justify-center space-x-5'>
            {/* Song Image */}

            <img
              src={song?.image}
              alt={song?.title}
              className='w-fit h-50 rounded-lg'
            />

            {/* Song Detail */}
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-[100px] font-bold leading-none'>
                {song?.title}
              </h1>
              <div className='flex flex-row items-center justify-center text-2xl space-x-2 '>
                <img
                  src='https://robohash.org/default-avatar.png'
                  alt={song?.title}
                  className='w-10 h-10 rounded-lg object-cover '
                />

                <span>{song?.description}</span>
                <div className='rounded-full bg-white w-2 h-2'></div>
                <span>2:50</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Audio Player (Footer) */}
      {song && <Player />}
    </div>
  )
}
export default SongDetail
