// this file is for the API endpoints
export const ApiConstantRoutes = {
  paths: {
    get auth() {
      return {
        get default() {
          return '/auth' // TODO: replace this with the actual endpoint
        },
        get login() {
          return `${this.default}/login`
        },
        get register() {
          return `${this.default}/register`
        },
        getUser(id: string) {
          return `/user/${id}`
        },
        updateUser(id: string) {
          return `/user/${id}`
        },
        activateArtist(id: string) {
          return `/user/activate-artist/${id}`
        },
        deactivateArtist(id: string) {
          return `/user/deactivate-artist/${id}`
        },
        getAllSongs() {
          // return `/songs/all?limit=10${cursor ? `&cursor=${cursor}` : ''}`
          return `/songs/all`
        },
        getSongDetail(id?: string) {
          return `/songs/${id}`
        },
      }
    },
    get songs() {
      return {
        get default() {
          return '/songs'
        },
        get getAllGenres() {
          return `${this.default}/genres/all`
        },
        get genres() {
          return `${this.default}/genres` // API route for creating a genre
        },
        get UploadSong() {
          return `${this.default}/upload`
        },
        getSongByArtist(id: string) {
          return `${this.default}/artist/${id}` //show shongs by artis id
        },
        deleteSong(songId: string) {
          return `${this.default}/${songId}`
        },
      }
    },
    get playlist() {
      return {
        get default() {
          return '/playlist'
        },
        get create() {
          return `${this.default}/create`
        },
        addsongstoplaylist() {
          return `${this.default}/add-song`
        },
        getUserPlaylist(id: string) {
          return `${this.default}/${id}`
        },
        getPlaylistDetail(id: number) {
          return `${this.default}/details/${id}`
        },
        removeSong() {
          return `${this.default}/remove-song`
        },
      }
    },
  },
}
