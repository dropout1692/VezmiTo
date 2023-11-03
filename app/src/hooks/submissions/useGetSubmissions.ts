import { useRequest } from '../request/useRequest'

export function useGetSubmissions() {
  const { data, loading, sendRequest, silentLoading } = useRequest({
    url: '/submissions/get',
  })

  return { data: data, loading, silentLoading, sendRequest }
}
