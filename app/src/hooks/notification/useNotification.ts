import React from 'react'
import {
  ToastContainer,
  ToastOptions,
  UpdateOptions,
  toast,
} from 'react-toastify'

export { ToastContainer }

export function useNotification() {
  const toastId = React.useRef<any>()
  function successNotification(
    content: string | React.ReactNode,
    options?: ToastOptions<{}>,
  ) {
    toast.success(content, options)
  }

  function errorNotification(
    content: string | React.ReactNode,
    options?: ToastOptions<{}>,
  ) {
    toastId.current = toast.error(content, options)
  }

  function warningNotification(
    content: string | React.ReactNode,
    options?: ToastOptions<{}>,
  ) {
    toast.warning(content, options)
  }

  function infoNotification(
    content: string | React.ReactNode,
    options?: ToastOptions<{}>,
  ) {
    toast.info(content, options)
  }

  const dismissNotification = () => toast.dismiss(toastId.current)

  const dismissAllNotifications = () => toast.dismiss()

  const updateNotification = (data: UpdateOptions) =>
    toast.update(toastId.current, data)

  return {
    successNotification,
    errorNotification,
    warningNotification,
    infoNotification,
    dismissNotification,
    dismissAllNotifications,
    updateNotification,
  }
}
