import axiosInstance from './axiosInstance'

export type RequestMethodType = 'get' | 'post'

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
      return axiosInstance({
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        ...(data && { data }),
        ...customConfig,
      }).then((res) => res.data)
    },
  }
}
