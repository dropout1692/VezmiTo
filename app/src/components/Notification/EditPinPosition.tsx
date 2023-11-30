import { ToastProps } from 'react-toastify/dist/types'

export function EditPinPosition({
  toastProps,
  submissionData,
  onSubmit,
}: {
  toastProps?: ToastProps
  submissionData?: Object
  onSubmit?: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:w-[500px]">
      <p>
        Skontroluj prosím umiestnenie. V prípade potreby pohybom na mape uprav
        pozíciu.
      </p>
      <button
        className="btn btn-primary mt-3 sm:mt-0 ml-0 sm:ml-3 text-center flex-shrink-0"
        onClick={onSubmit}
      >
        Odoslať
      </button>
    </div>
  )
}
