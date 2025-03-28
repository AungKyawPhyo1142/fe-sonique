import { create } from 'zustand/react'

export interface Song {
  id: string
  title: string
  artist: string
  image: string
  songSrc: string
}

interface PlayerStore {
  currentSong: Song | null
  isPlaying: boolean
  time: number
  duration: number
  volume: number
  audioElement: HTMLAudioElement | null
  queue: Song[]
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
  shuffleQueue: () => void
  setCurrentTime: (time: number) => void  
  isShuffledOn: boolean
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  isPaused: false,
  volume: 0.5,
  duration: 0,
  time: 0,
  isShuffledOn: false,
  audioElement: null,
  queue: [],
  initializeAudio: () => {
    if (
      typeof window !== 'undefined' &&
      !usePlayerStore.getState().audioElement
    ) {
      const audio = new Audio()
      set({ audioElement: audio })
      console.log('Audio element initialized:', audio) // Debugging log
      console.log('Audio element initialized:', audio) // Debugging log
    }
  },
  setNewQueue: (newQueue: Song[]) => {
    set({ queue: newQueue })
  },
  setCurrentTime: (time: number) => {
    set({ time: time })
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
  shuffleQueue: () => {
    const { queue, currentSong } = get()
    const shuffledQueue = [...queue].sort(() => Math.random() - 0.5)

    if (currentSong) {
      const currentIndex = shuffledQueue.findIndex(
        (song) => song.id === currentSong.id,
      )

      // Remove the current song from its position and move it to the start
      const songToMove = shuffledQueue[currentIndex]
      shuffledQueue.splice(currentIndex, 1)
      shuffledQueue.unshift(songToMove)
    }

    set({ queue: shuffledQueue })
    set({ isShuffledOn: true })
    console.log('Shuffled queue:', get().queue)
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
    set((state) => {
      const { audioElement } = state
      if (audioElement) {
        return { time: audioElement.currentTime } // Ensure state update
      }
      return state
    })
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
    const { currentSong, queue } = get()
    if (!currentSong) {
      if (queue.length > 0) {
        get().setCurrentSong(queue[0])
      }
      return
    }

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id)
    if (currentIndex < queue.length - 1) {
      get().setCurrentSong(queue[currentIndex + 1])
    }
  },

  playPrevious: () => {
    const { currentSong, queue } = get()
    if (!currentSong) {
      if (queue.length > 0) {
        get().setCurrentSong(queue[0])
      }
      return
    }

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id)
    if (currentIndex > 0) {
      get().setCurrentSong(queue[currentIndex - 1])
    }
  },
}))
