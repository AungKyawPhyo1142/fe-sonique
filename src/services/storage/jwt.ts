// import * as jose from 'jose'

// /*
//     This service is responsible for decoding and checking the expiration of the JWT token.
// */

// interface JWTDecoded extends jose.JWTPayload {
//   username: string
//   createdAt: Date
//   email: string
//   firstName: string
//   lastName: string
//   id: number
// }

// export const JWTServices = {
//   decode(token: string): JWTDecoded {
//     const decoded: JWTDecoded = jose.decodeJwt(token)
//     console.log('JWT Decoded: ', decoded)
//     return decoded
//   },
//   expired(token: string): boolean {
//     const decoded: JWTDecoded = jose.decodeJwt(token)
//     const now = Math.floor(Date.now() / 1000)
//     return !!(decoded.exp && decoded.exp < now)
//   },
// }
