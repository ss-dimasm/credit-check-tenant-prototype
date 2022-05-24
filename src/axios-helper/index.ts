import axios from 'axios'
import { BASE_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

const Axios = axios.create({
  baseURL: window.reapit.config.platformApiUrl,
  headers: {
    ...BASE_HEADERS,
  },
})
;(async () => {
  if (reapitConnectBrowserSession) {
    reapitConnectBrowserSession.connectSession().then((session) => {
      if (session) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`
      }
    })
  }
})()

export default Axios
