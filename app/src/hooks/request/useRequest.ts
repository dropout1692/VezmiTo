import { useState, useEffect, useCallback } from 'react'
import stringify from '../../libs/tools/stringify'
import { apiClient, RequestMethodType } from '../../api/apiClient'

type ApiResponseType = {
  data: any
  errors?: {
    message: string
  }[]
}

type VariablesType = Record<string, any>

type UseRequestProps = {
  readonly url: string
  readonly method?: RequestMethodType
  readonly variables?: VariablesType
  readonly invalidateCond?: Array<string | number>
  readonly runOnInit?: boolean
}

type SendRequestConfig = {
  readonly mergeVars?: boolean
  readonly useAsPromise?: boolean
  readonly onlySilentLoading?: boolean
  readonly onlySilentError?: boolean
}

export type RequestErrorsType =
  | {
      message: string
      code: string
    }[]
  | null
  | undefined

type SendRequestResult = Promise<{
  data: Record<string, any> | null | undefined
  errors: RequestErrorsType
}> | void

type ResultType = {
  readonly loading: boolean
  readonly silentLoading: boolean
  readonly error: boolean
  readonly silentError: boolean
  readonly data: Record<string, any> | null
  readonly sendRequest: (
    vars?: VariablesType,
    config?: SendRequestConfig,
  ) => SendRequestResult
}

const INITIAL_STATE = {
  loading: true,
  silentLoading: true,
  error: false,
  silentError: false,
  data: null,
}

export function useRequest({
  url,
  method,
  invalidateCond = [],
  variables = {},
  runOnInit = true,
}: UseRequestProps): ResultType {
  if (!url) {
    throw Error('[useRequest] - Property `url` not defined')
  }

  const [state, setState] = useState({
    ...INITIAL_STATE,
    loading: runOnInit,
    silentLoading: runOnInit,
  })

  const changeState = useCallback(
    (args: VariablesType) => {
      setState((prevState) => ({
        ...prevState,
        ...args,
      }))
    },
    [stringify(state)],
  )

  function sendRequest(
    vars: VariablesType = {},
    config?: SendRequestConfig,
  ): SendRequestResult {
    const {
      mergeVars = false,
      onlySilentLoading = false,
      onlySilentError = false,
      useAsPromise = false,
    } = config || {}

    if (!useAsPromise) {
      changeState({
        loading: !onlySilentLoading,
        silentLoading: true,
        error: false,
        silentError: false,
      })
    }

    const requestPromise = apiClient()
      .request({
        url,
        method,
        data: mergeVars
          ? {
              ...variables,
              ...vars,
            }
          : vars,
      })
      .then((res: ApiResponseType) => {
        if (!useAsPromise) {
          changeState({
            data: res,
            loading: false,
            silentLoading: false,
            error: false,
            silentError: false,
          })
        }

        return {
          data: res,
          errors: [],
        }
      })
      .catch((err: any) => {
        console.warn('[apiClient]', err.message)

        if (!useAsPromise) {
          changeState({
            error: !onlySilentError,
            silentError: true,
            loading: false,
            silentLoading: false,
          })
        }

        return {
          data: null,
          errors: [{ message: err.message, code: '' }],
        }
      })
    if (useAsPromise) return requestPromise
  }

  useEffect(() => {
    if (!runOnInit) return
    sendRequest()
  }, [url, stringify(variables), ...invalidateCond])

  return {
    loading: state.loading,
    silentLoading: state.silentLoading,
    error: state.error,
    silentError: state.silentError,
    data: state.data,
    sendRequest,
  }
}
