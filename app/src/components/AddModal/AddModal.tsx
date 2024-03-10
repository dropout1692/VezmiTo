import './addModal.scss'
import * as Dialog from '@radix-ui/react-dialog'
import { Icon } from '../Icon'
import * as Form from '@radix-ui/react-form'
import { Combobox } from '../Combobox/Combobox'
import { useCallback, useEffect, useState } from 'react'
import { stringify } from '../../libs/tools/stringify'
import clsx from 'clsx'
import { useGeolocation } from '../../hooks/location/useGeolocation'
import { ImageUpload } from '../ImageUpload/ImageUpload'
import { useImageUpload } from '../../hooks/upload/useImageUpload'
import { FREEBIES } from '../../config/freebies'
import slugify from 'slugify'
import { useNotification } from '../../hooks/notification/useNotification'
import { EditPinPosition } from '../Notification/EditPinPosition'
import {
  CreateSubmissionData,
  SubmissionType,
  deleteTempSubmission,
  tempAddSubmission,
  updateTempSubmission,
  useSubmissionsDispatch,
} from '../../store/features/submissions/submissionsSlice'
import { randomString } from '../../libs/tools/randomString'
import {
  setIsLoading,
  setSelectedSubmission,
  usePageDispatch,
} from '../../store/features/page/pageSlice'

type OutputDataType = {
  tags?: string[]
  title?: string
  photo?: string
  coords?: GeolocationCoordinates
  tag?: string
  tempImageData?: any
  submissionType?: SubmissionType
  description?: string
}

const ADD_MODAL_COMBOBOX_OPTIONS = FREEBIES.sort((a, b) =>
  slugify(a.title) > slugify(b.title) ? 1 : -1,
).map((freebie) => ({
  value: freebie,
  label: freebie.title,
}))

export const AddModal = ({
  onOpenChange,
  open,
  onSubmit,
}: {
  onOpenChange?: () => void
  open?: boolean
  onSubmit: (data: CreateSubmissionData) => void
}) => {
  const [output, setOutput] = useState<OutputDataType>({})
  const { infoNotification, dismissAllNotifications } = useNotification()
  const submissionsDispatch = useSubmissionsDispatch()
  const pageDispatch = usePageDispatch()
  const imageUpload = useImageUpload()
  const { geoData, getCurrentPosition } = useGeolocation({ getOnInit: false })

  const handleOnChange = (data: { name: string; data: any }[]) => {
    const newData = data.reduce(
      (acc, { name, data }) => ({ ...acc, [name]: data }),
      {},
    )
    setOutput((prevState) => ({
      ...prevState,
      ...newData,
    }))
  }

  const reset = () => {
    submissionsDispatch(deleteTempSubmission())
    pageDispatch(setSelectedSubmission(''))
    setOutput({})
    dismissAllNotifications()
  }

  const handleSetSubmission = useCallback(
    async (e: any) => {
      e.preventDefault()
      const tempId = randomString(8)
      submissionsDispatch(
        tempAddSubmission({
          id: tempId,
          title: output?.title,
          submissionType: output?.submissionType,
          tags: [output?.tag],
          location: {
            latitude: geoData?.coords?.latitude,
            longitude: geoData?.coords?.longitude,
            altitude: geoData?.coords?.altitude,
          },
          meta: {
            tempLocation: true,
          },
        }),
      )
      pageDispatch(setSelectedSubmission(tempId))

      infoNotification(
        <EditPinPosition
          onSubmit={(data) => {
            onSubmit(data)
            reset()
          }}
        />,
        {
          autoClose: false,
          onClose: () => {
            submissionsDispatch(deleteTempSubmission())
            pageDispatch(setSelectedSubmission(''))
            setOutput({})
          },
        },
      )
      if (onOpenChange) {
        onOpenChange()
      }
      if (output.tempImageData) {
        pageDispatch(setIsLoading(true))

        await imageUpload(output.tempImageData, {
          onSuccess: (imageUploadRes) => {
            if (imageUploadRes?.secure_url) {
              submissionsDispatch(
                updateTempSubmission({
                  id: tempId,
                  photoUrls: [imageUploadRes.secure_url],
                }),
              )
            }
            pageDispatch(setIsLoading(false))
          },
          onError: () => {
            reset()
          },
        })
      }
    },
    [stringify({ output, geoData })],
  )

  useEffect(() => {
    if (open) {
      getCurrentPosition()
    }
    return () => setOutput({})
  }, [open])

  const isSubmitDisabled = !(output.title && output.tag && geoData.coords)

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Form.Root className="mt-8 space-y-3">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Vyber kategóriu
              </label>
              <Combobox
                onChange={({ value }) =>
                  handleOnChange([
                    { name: 'title', data: value.title },
                    { name: 'tag', data: value.tag },
                    { name: 'submissionType', data: 'FREEBIE' },
                  ])
                }
                placeholder={'Kategória'}
                data={ADD_MODAL_COMBOBOX_OPTIONS}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <ImageUpload
                onChange={(file) => {
                  handleOnChange([{ name: 'tempImageData', data: file }])
                }}
                previewSrc={
                  output?.tempImageData
                    ? URL.createObjectURL(output?.tempImageData)
                    : ''
                }
              />
            </div>
            <Dialog.Close asChild>
              <div>
                {!geoData?.coords && (
                  <p className="text-center text-warning">
                    Nepodarilo sa načítať aktuálnu polohu
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleSetSubmission}
                  disabled={isSubmitDisabled}
                  className={clsx(
                    'box-border flex w-full justify-center items-center bg-primary text-white p-4  rounded-full font-semibold  shadow-lg cursor-pointer transition ease-in duration-300 mt-5',
                    { 'opacity-50': isSubmitDisabled },
                  )}
                >
                  Umiestni
                </button>
              </div>
            </Dialog.Close>
          </Form.Root>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Icon provider="phosphor" icon="x" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
