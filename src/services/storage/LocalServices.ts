import { config } from '../../../config/register'
import { AuthState } from '../zustand/authStore'
import CryptoJS from 'crypto-js'

const browser = typeof window !== 'undefined'
const CONFIG_NAME = config.name + '-auth'

/*
    This service is responsible for setting, getting, and clearing the local storage.
    It is used to store the user's authentication token and other data.
*/

export const LocalServices = {
  setLocalStorage(value: AuthState): void {
    if (!browser) return
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      config.root,
    ).toString()
    localStorage.setItem(CONFIG_NAME, encryptedData)
  },
  getLocalStorage(): AuthState | undefined {
    if (!browser) return undefined
    const item = localStorage.getItem(CONFIG_NAME)
    if (item) {
      try {
        const decryptedData = CryptoJS.AES.decrypt(item, config.root).toString(
          CryptoJS.enc.Utf8,
        )
        if (decryptedData) {
          const result: AuthState = JSON.parse(decryptedData)

          return result
        }
      } catch (error) {
        console.log('Error decrypting data:', error)
        this.clearLocalStorage()
      }
    }
  },
  clearLocalStorage(): void {
    if (!browser) return
    localStorage.removeItem(CONFIG_NAME)
  },
}
