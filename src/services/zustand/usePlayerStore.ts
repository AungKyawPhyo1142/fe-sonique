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
  currentTime: number
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
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  isPaused: false,
  volume: 0.5,
  duration: 0,
  currentTime: 0,
  audioElement: null,
  queue: [],
  initializeAudio: () => {
    if (!get().audioElement) {
      const audio = new Audio()
      audio.volume = get().volume
      set({ audioElement: audio })
    }
  },
  setNewQueue: (newQueue: Song[]) => {
    set({ queue: newQueue })
  },
  playThisSong: (song: Song) => {
    const { queue, setCurrentSong, setNewQueue,togglePlay } = get()
    setNewQueue([song])
    setCurrentSong(song)
    togglePlay()

    console.log('queue is ', queue)
  },
  setCurrentSong: (song: Song) => {
    const { audioElement } = get()
    if (audioElement) {
      audioElement.src = song.songSrc
      audioElement.play().catch(console.error)
      set({ currentSong: song, isPlaying: true })
    }
  },
 onChangeCurrentTime: (time: number) => {
    const { audioElement } = get()
    if (audioElement) {
      audioElement.currentTime = time
      set({ currentTime: time })
    }
  },
  updateProgress: () => {
    const { audioElement } = get()
    if (audioElement) {
      set({ currentTime: audioElement.currentTime })
    }
  },

  togglePlay: () => {
    const { audioElement, isPlaying } = get()

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play().catch(console.error)
      }
      set({ isPlaying: !isPlaying })
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
