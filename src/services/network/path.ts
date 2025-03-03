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
        }
      }
    },
  },
}
