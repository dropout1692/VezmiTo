import './addModal.scss'
import * as Dialog from '@radix-ui/react-dialog'
import { Icon } from '../Icon'
import * as Form from '@radix-ui/react-form'
import { Combobox } from '../Combobox/Combobox'
import { useCallback, useEffect, useState } from 'react'
import stringify from '../../libs/tools/stringify'
import clsx from 'clsx'
import { useGeolocation } from '../../hooks/location/useGeolocation'

type OutputDataType = {
  id?: string
  photo?: any
  coords?: GeolocationCoordinates
}

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
  const { geoData, getCurrentPosition } = useGeolocation({ getOnInit: false })

  const handleOnChange = (name: string, data: any) => {
    setOutput((prevState) => ({
      ...prevState,
      [`${name}`]: data,
    }))
  }

  const handleOnSubmit = useCallback(() => {
    onSubmit({
      coords: geoData?.coords,
      ...output,
    })
  }, [stringify({ output, geoData })])

  useEffect(() => {
    if (open) {
      getCurrentPosition()
    }
    return () => setOutput({})
  }, [open])

  const isSubmitDisabled = !(output.id && output.photo && geoData?.coords)

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Form.Root className="mt-8 space-y-3">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Select category
              </label>
              <Combobox
                onChange={({ label }) => handleOnChange('id', label)}
                placeholder={'Jablko'}
                data={[
                  { value: 0, label: 'baklažán' },
                  { value: 1, label: 'biela reďkovka' },
                  { value: 2, label: 'brokolica' },
                  { value: 3, label: 'cesnak' },
                  { value: 4, label: 'cibuľa' },
                  { value: 5, label: 'cuketa' },
                  { value: 6, label: 'cvikla' },
                  { value: 7, label: 'hrach' },
                  { value: 8, label: 'hrozno' },
                  { value: 9, label: 'hruška' },
                  { value: 10, label: 'jablko' },
                  { value: 11, label: 'jahoda' },
                  { value: 12, label: 'jahňací šalát' },
                  { value: 13, label: 'kaleráb' },
                  { value: 14, label: 'kapusta' },
                  { value: 15, label: 'karfiol' },
                  { value: 16, label: 'mangold' },
                  { value: 17, label: 'marhuľa' },
                  { value: 18, label: 'mrkva' },
                  { value: 19, label: 'ostružina' },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach photo
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full min-h-40 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center ">
                    <div className="text-5xl text-primary p-4">
                      {output?.photo ? (
                        <img
                          className="h-20 object-contain"
                          src={output?.photo}
                        />
                      ) : (
                        <Icon provider="phosphor" icon="tree" />
                      )}
                    </div>
                    <p className="pointer-none text-gray-500 text-sm ">
                      <span>Drag and drop</span> files here <br /> or select a
                      file from your gallery
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleOnChange(
                        'photo',
                        URL.createObjectURL(e.target.files[0]),
                      )
                    }
                  />
                </label>
              </div>
            </div>
            <Dialog.Close asChild>
              <div>
                <button
                  type="button"
                  onClick={handleOnSubmit}
                  disabled={isSubmitDisabled}
                  className={clsx(
                    'box-border flex w-full justify-center bg-primary text-white p-4  rounded-full font-semibold  shadow-lg cursor-pointer transition ease-in duration-300 mt-5',
                    { 'opacity-50': isSubmitDisabled },
                  )}
                >
                  Submit
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
