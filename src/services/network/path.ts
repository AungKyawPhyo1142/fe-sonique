// this file is for the API endpoints
export const ApiConstantRoutes = {
  paths: {
    get auth() {
      return {
        get default() {
          return '/v1/auth' // TODO: replace this with the actual endpoint
        },
        get login() {
          return `${this.default}/login`
        },
      }
    },
  },
}
