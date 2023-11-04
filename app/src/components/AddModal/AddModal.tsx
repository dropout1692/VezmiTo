import './addModal.scss'
import * as Dialog from '@radix-ui/react-dialog'
import { Icon } from '../Icon'
import * as Form from '@radix-ui/react-form'
import { Combobox } from '../Combobox/Combobox'
import { useCallback, useEffect, useState } from 'react'
import stringify from '../../libs/tools/stringify'
import clsx from 'clsx'
import { useGeolocation } from '../../hooks/location/useGeolocation'
import { ImageUpload } from '../ImageUpload/ImageUpload'
import { useImageUpload } from '../../hooks/upload/useImageUpload'
import { Spinner } from '../Spinner/Spinner'
import { FREEBIES } from '../../config/freebies'
import slugify from 'slugify'

type OutputDataType = {
  tags?: string[]
  title?: string
  photo?: any
  coords?: GeolocationCoordinates
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
  onSubmit: (data: OutputDataType) => void
}) => {
  const [output, setOutput] = useState<OutputDataType>({})
  const [loading, setLoading] = useState<boolean>(false)
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

  const handleOnSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      await imageUpload(output.photo, {
        onSuccess: (imageUploadData) => {
          setLoading(false)
          onSubmit({
            title: output?.title,
            tags: [output?.tag],
            coords: geoData?.coords,
            photo: imageUploadData.url,
          })
          if (onOpenChange) {
            onOpenChange()
          }
        },
        onError: () => {
          setLoading(false)
        },
      })
    },
    [stringify({ output, geoData })],
  )

  useEffect(() => {
    if (open) {
      getCurrentPosition()
    }
    return () => setOutput({})
  }, [open])

  const isSubmitDisabled = !(
    output.photo &&
    output.title &&
    output.tag &&
    geoData.coords
  )

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
                  ])
                }
                placeholder={'Kategória'}
                data={ADD_MODAL_COMBOBOX_OPTIONS}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <ImageUpload
                onChange={(file) =>
                  handleOnChange([{ name: 'photo', data: file }])
                }
                previewSrc={
                  output?.photo ? URL.createObjectURL(output?.photo) : ''
                }
              />
            </div>
            <Dialog.Close asChild>
              <div>
                <button
                  type="button"
                  onClick={handleOnSubmit}
                  disabled={isSubmitDisabled}
                  className={clsx(
                    'box-border flex w-full justify-center items-center bg-primary text-white p-4  rounded-full font-semibold  shadow-lg cursor-pointer transition ease-in duration-300 mt-5',
                    { 'opacity-50': isSubmitDisabled },
                  )}
                >
                  <Spinner show={loading} />
                  Odoslať
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
