import axiosInstance from './axiosInstance'
import { dispatchType } from '../store/storeInstance'
import { UI } from '../store/redux/constants'

export type RequestMethodType = 'get' | 'post'

let requestCounter = 0

export function apiClient({ customConfig = {} } = {}) {
  return {
    request({
      url,
      method = 'get',
      data,
    }: {
      url: string
      method?: RequestMethodType
      data?: Record<string, any>
    }) {
      if (requestCounter === 0) {
        dispatchType(UI.SET_LOADING_START)
      }
      return axiosInstance({
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(data && { data }),
        ...customConfig,
      })
        .then((res) => res.data)
        .finally(() => {
          if (requestCounter >= 1) {
            requestCounter -= 1
          }

          if (requestCounter === 0) {
            dispatchType(UI.SET_LOADING_STOP)
          }
        })
    },
  }
}
