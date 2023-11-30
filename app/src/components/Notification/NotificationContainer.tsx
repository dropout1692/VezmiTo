import React from 'react'
import { ToastContainer } from '../../hooks/notification/useNotification'
import { ToastContainerProps } from 'react-toastify'
import './notification.scss'

export function NotificationContainer(options: ToastContainerProps = {}) {
  return (
    <ToastContainer
      position="bottom-center"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      {...options}
    />
  )
}
