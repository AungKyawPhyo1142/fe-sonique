import { create } from "zustand";

interface Song {
  id: string;
  title: string;
  description: string;
  image: string;
  songSrc: string;
}

interface SongState {
  queue: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  shuffleEnabled: boolean;
  repeatMode: "off" | "all" | "one";
  audio: HTMLAudioElement | null;

  // Actions
  playPause: () => void;
  setCurrentSongIndex: (index: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  addToQueue: (song: Song) => void;
  clearQueue: () => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: "off" | "all" | "one") => void;
}

export const useSongStore = create<SongState>((set, get) => ({
  queue: [
    {
      id: '1',
      image: 'https://i.scdn.co/image/ab67616d0000b27336032cb4acd9df050bc2e197',
      title: 'APT',
      description: 'Rose, BrunoMars',
      songSrc: '/audio/APT.mp3',
    },
  ],
  currentSongIndex: 0,
  isPlaying: false,
  shuffleEnabled: false,
  repeatMode: "off",
  audio: new Audio(),

  playPause: () => {
    const { audio, isPlaying } = get();
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    set({ isPlaying: !isPlaying });
  },

  setCurrentSongIndex: (index: number) => {
    const { queue, audio } = get();
    if (index < 0 || index >= queue.length) return;

    if (audio) {
      audio.src = queue[index].songSrc;
      audio.play();
    }

    set({ currentSongIndex: index, isPlaying: true });
  },

  nextSong: () => {
    const { queue, currentSongIndex, repeatMode, shuffleEnabled, setCurrentSongIndex } = get();
    let newIndex = currentSongIndex + 1;

    if (shuffleEnabled) {
      newIndex = Math.floor(Math.random() * queue.length);
    }

    if (newIndex >= queue.length) {
      newIndex = repeatMode === "all" ? 0 : currentSongIndex; // Restart if repeat all, else stay
    }

    setCurrentSongIndex(newIndex);
  },

  previousSong: () => {
    const { currentSongIndex, setCurrentSongIndex } = get();
    setCurrentSongIndex(currentSongIndex > 0 ? currentSongIndex - 1 : 0);
  },

  addToQueue: (song: Song) => {
    set((state) => ({ queue: [...state.queue, song] }));
  },

  clearQueue: () => {
    set({ queue: [], currentSongIndex: 0, isPlaying: false });
  },

  toggleShuffle: () => {
    set((state) => ({ shuffleEnabled: !state.shuffleEnabled }));
  },

  setRepeatMode: (mode: "off" | "all" | "one") => {
    set({ repeatMode: mode });
  },
}));

export default useSongStore;
