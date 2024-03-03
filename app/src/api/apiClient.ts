import axiosInstance from './axiosInstance'

export type RequestMethodType = 'get' | 'post' | 'put'

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
          ...(method === 'get' && {
            'Content-Type': 'application/json',
          }),
          ...(method === 'put' && {
            Accept: '*/*',
          }),
        },
        ...(data && { data }),
        ...customConfig,
      }).then((res) => res.data)
    },
  }
}
