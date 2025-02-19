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
      }
    },

    // TODO: DELETE THIS LATER
    get example() {
      return '/example'
    },
  },
}
