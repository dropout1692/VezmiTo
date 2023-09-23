import './addModal.scss'
import * as Dialog from '@radix-ui/react-dialog'
import { Icon } from '../Icon'
import * as Form from '@radix-ui/react-form'
import { Select } from '../Form/components/Select/Select'

export const AddModal = ({ onOpenChange, open, onSubmit }) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Form.Root className="mt-8 space-y-3">
            <div className="grid grid-cols-1 space-y-2">
              <Select
                onChange={console.log}
                placeholder="Select category"
                options={[
                  {
                    value: 'Jablko',
                    label: 'jablko',
                  },
                  {
                    value: 'Hruska',
                    label: 'hruska',
                  },

                  {
                    value: 'Hruska2',
                    label: 'hruska2',
                  },

                  {
                    value: 'Hruska3',
                    label: 'hruska3',
                  },

                  {
                    value: 'Hruska4',
                    label: 'hruska4',
                  },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach photo
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-40 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center ">
                    <div className="text-5xl text-primary p-4">
                      <Icon provider="phosphor" icon="tree" />
                    </div>
                    <p className="pointer-none text-gray-500 text-sm ">
                      <span>Drag and drop</span> files here <br /> or select a
                      file from your gallery
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={console.log}
                  />
                </label>
              </div>
            </div>
            <Dialog.Close asChild>
              <div>
                <button
                  type="button"
                  onClick={onSubmit}
                  className="box-border	flex w-full justify-center bg-primary text-white p-4  rounded-full
                                    font-semibold  shadow-lg cursor-pointer transition ease-in duration-300 mt-5"
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
