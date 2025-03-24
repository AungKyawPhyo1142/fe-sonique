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
        getAllSongs(cursor?: string) {
          return `/songs/all?limit=10${cursor ? `&cursor=${cursor}` : ''}`
        }
      }
    },
  },
}
