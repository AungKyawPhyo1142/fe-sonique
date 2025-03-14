export const AppConstantRoutes = {
  paths: {
    get auth() {
      return {
        get default() {
          return '/auth'
        },
        get login() {
          return `${this.default}/login`
        },
        get register() {
          return `${this.default}/register`
        },
      }
    },

    // TODO: DELETE THIS LATER
    get example() {
      return '/example'
    },

    get default() {
      return '/'
    },
    get home() {
      return '/home'
    },
    get profile() {
      return '/profile'
    },
    get searchPage() {
      return '/search'
    },
    get musictypePage() {
      return (title = ':title') => `/musictype/${title}`
    },
    get songDetailPage() {
      return (id: string) => `/songDetail/${id}`
    },
  },
}
