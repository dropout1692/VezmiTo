import { useCallback } from 'react'
import { RequestErrorsType, useRequest } from '../request/useRequest'

type OnErrorType = (arg0: RequestErrorsType) => void

export type CallbacksType = {
  onSuccess?: (data?: Record<string, any> | null) => void
  onError?: OnErrorType
}

export function useImageUpload() {
  const { sendRequest: uploadImage } = useRequest({
    url: `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    method: 'post',
    runOnInit: false,
    variables: {},
  })

  return useCallback(async (image: File, { onSuccess }: CallbacksType = {}) => {
    let result: { data: any; errors: RequestErrorsType } = {
      data: null,
      errors: [],
    }
    const saveData = new FormData()
    saveData.append('file', image)
    saveData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    )
    saveData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
    saveData.append('folder', import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER)

    try {
      const { data: requestData, errors: requestErrors } =
        (await uploadImage(saveData, {
          useAsPromise: true,
        })) || {}

      if (requestErrors && requestErrors.length > 0) {
        throw requestErrors
      }

      if (onSuccess) {
        onSuccess(requestData)
      }

      result = {
        data: requestData,
        errors: [],
      }
    } catch (errs) {
      console.warn('[uploadImage]', errs)
      result = {
        data: null,
        errors: errs as RequestErrorsType,
      }
    }

    return result
  }, [])
}
