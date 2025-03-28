import { create } from 'zustand/react'

export interface Song {
  id: string
  title: string
  artist: string
  image: string
  songSrc: string
}
type RepeatMode = 'off' | 'song' | 'playlist'

type ShuffleMode = 'on' | 'off'

interface PlayerStore {
  currentSong: Song | null
  isPlaying: boolean
  time: number
  duration: number
  volume: number
  audioElement: HTMLAudioElement | null
  queue: Song[]
  shuffleMode: ShuffleMode
  repeatMode: RepeatMode
  isShuffled: boolean

  shuffledPlaylist: Song[]
  playThisSong: (song: Song) => void
  setNewQueue: (songs: Song[]) => void
  setCurrentSong: (song: Song) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  initializeAudio: () => void
  playNext: () => void
  playPrevious: () => void
  onChangeCurrentTime: (time: number) => void
  updateProgress: () => void
  addToQueue: (song: Song) => void
  toogleShuffle: () => void
  setCurrentTime: (time: number) => void

  toggleRepeatMode: () => void
}
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  isPaused: false,
  volume: 0.5,
  duration: 0,
  isShuffled: false,
  repeatMode: 'off',
  time: 0,
  shuffledPlaylist: [],
  shuffleMode: 'off',
  audioElement: null,
  queue: [],
  initializeAudio: () => {
    if (
      typeof window !== 'undefined' &&
      !usePlayerStore.getState().audioElement
    ) {
      const audio = new Audio()
      set({ audioElement: audio })

      audio.addEventListener('timeupdate', () => {
        get().updateProgress()
      })

      audio.addEventListener('ended', () => {
        const { repeatMode } = get()

        if (repeatMode === 'song') {
          const { currentSong } = get()
          if (currentSong) {
            get().setCurrentSong(currentSong)
          }
        } else if (repeatMode === 'playlist') {
          const { currentSong, queue, shuffledPlaylist, isShuffled } = get()
          const currentPlaylist = isShuffled ? shuffledPlaylist : queue
          const currentIndex = currentPlaylist.findIndex(
            (song) => song.id === currentSong?.id,
          )
          if (currentIndex === currentPlaylist.length - 1) {
            // If it's the last song, start from the beginning
            get().setCurrentSong(currentPlaylist[0])
          } else {
            get().playNext()
          }
        } else {
          get().playNext()
        }
      })
      console.log('Audio element initialized:', audio) // Debugging log
      // Debugging log
    }
  },
  setNewQueue: (newQueue: Song[]) => {
    set({ queue: newQueue })
  },

  toggleRepeatMode: () => {
    const { repeatMode } = get()
    const modes: RepeatMode[] = ['off', 'song', 'playlist']
    const currentIndex = modes.indexOf(repeatMode)
    const nextIndex = (currentIndex + 1) % modes.length
    set({ repeatMode: modes[nextIndex] })
  },

  setCurrentTime: (time: number) => {
    const { audioElement } = get()
    if (audioElement) {
      audioElement.currentTime = time
      set({ time: time })
    }
  },
  playThisSong: (song: Song) => {
    const { audioElement, initializeAudio } = get()
    if (!audioElement) {
      console.error('Audio element not found')
      initializeAudio()
    }
    if (!song || !song.songSrc) {
      console.error('Invalid song object:', song)
      return
    }

    const { setNewQueue, setCurrentSong } = get()
    setNewQueue([song])
    setCurrentSong(song)

    console.log('queue is', get().queue)
  },

  addToQueue: (song: Song) => {
    const { queue } = get()
    set({ queue: [...queue, song] })
    console.log('adding song to queue', get().queue)
    if (queue.length === 0) {
      get().playThisSong(song)
    }
  },
  toogleShuffle: () => {
    const { isShuffled, queue, currentSong } = get()
    if (!isShuffled) {
      // When enabling shuffle, create a new shuffled playlist
      const newShuffledPlaylist = shuffleArray(queue)

      // If there's a current song, make sure it stays in its current position
      if (currentSong) {
        const currentIndex = queue.findIndex(
          (song) => song.id === currentSong.id,
        )
        const shuffledIndex = newShuffledPlaylist.findIndex(
          (song) => song.id === currentSong.id,
        )
        if (currentIndex !== shuffledIndex) {
          ;[
            newShuffledPlaylist[currentIndex],
            newShuffledPlaylist[shuffledIndex],
          ] = [
            newShuffledPlaylist[shuffledIndex],
            newShuffledPlaylist[currentIndex],
          ]
        }
      }

      set({ isShuffled: true, shuffledPlaylist: newShuffledPlaylist })
    } else {
      // When disabling shuffle, clear the shuffled playlist
      set({ isShuffled: false, shuffledPlaylist: [] })
    }
  },

  setCurrentSong: (song: Song) => {
    const { audioElement } = get()
    if (!audioElement) {
      console.error('Audio element not found')
      return
    }
    if (!song || !song.songSrc) {
      console.error('Invalid song object:', song)
      return
    }

    if (audioElement) {
      audioElement.src = song.songSrc
      audioElement
        .play()
        .then(() => set({ currentSong: song, isPlaying: true })) // Ensure state updates after playing
        .catch(console.error)
    } else {
      console.error('Audio element not found')
    }
  },

  onChangeCurrentTime: (time: number) => {
    const { audioElement } = get()
    if (audioElement) {
      audioElement.currentTime = time
      set({ time: time })
    }
  },

  updateProgress: () => {
    const { audioElement } = get()
    if (audioElement) {
      set({ time: audioElement.currentTime })
    }
  },

  togglePlay: () => {
    const { audioElement, isPlaying, currentSong } = get()
    console.log('Toggle Play called, isPlaying:', currentSong) // Debugging step

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement
          .play()
          .then(() => console.log('Audio playing'))
          .catch(console.error)
      }
      set({ isPlaying: !isPlaying })
    } else {
      console.error('Audio element not found')
    }
  },
  setVolume: (volume: number) => {
    const { audioElement } = get()
    if (audioElement) {
      audioElement.volume = volume
      set({ volume })
    }
  },

  playNext: () => {
    const { currentSong, queue, shuffledPlaylist, isShuffled } = get()
    const currentPlaylist = isShuffled ? shuffledPlaylist : queue
    if (!currentSong) {
      if (currentPlaylist.length > 0) {
        get().setCurrentSong(currentPlaylist[0])
      }
      return
    }

    const currentIndex = currentPlaylist.findIndex(
      (song) => song.id === currentSong.id,
    )
    if (currentIndex < currentPlaylist.length - 1) {
      get().setCurrentSong(currentPlaylist[currentIndex + 1])
    }
  },

  playPrevious: () => {
    const { currentSong, queue, shuffledPlaylist, isShuffled } = get()
    const currentPlaylist = isShuffled ? shuffledPlaylist : queue

    if (!currentSong) {
      if (currentPlaylist.length > 0) {
        get().setCurrentSong(currentPlaylist[0])
      }
      return
    }

    const currentIndex = currentPlaylist.findIndex(
      (song) => song.id === currentSong.id,
    )
    if (currentIndex > 0) {
      get().setCurrentSong(currentPlaylist[currentIndex - 1])
    }
  },
}))
