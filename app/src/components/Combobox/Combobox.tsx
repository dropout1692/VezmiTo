import { Fragment, useState } from 'react'
import { Combobox as HeadlessuiCombobox, Transition } from '@headlessui/react'
import { Icon } from '../Icon'

export const Combobox = ({ data, onChange, placeholder }) => {
  const [selected, setSelected] = useState()
  const [query, setQuery] = useState('')

  const filteredData =
    query === ''
      ? data
      : data.filter((item) =>
          item.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )
  return (
    <div className="w-full">
      <HeadlessuiCombobox
        value={selected || ''}
        onChange={(val) => {
          setSelected(val)
          onChange(val)
        }}
      >
        <div className="relative mt-1">
          <div className="relative border w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <HeadlessuiCombobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(item) => item.label}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />
            <HeadlessuiCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Icon
                className="h-5 w-5 text-gray-400"
                provider="phosphor"
                icon="caret-down"
                aria-hidden="true"
              />
            </HeadlessuiCombobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <HeadlessuiCombobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredData.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((item) => (
                  <HeadlessuiCombobox.Option
                    key={item.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-primary'
                            }`}
                          >
                            <Icon
                              provider="phosphor"
                              icon="check"
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </HeadlessuiCombobox.Option>
                ))
              )}
            </HeadlessuiCombobox.Options>
          </Transition>
        </div>
      </HeadlessuiCombobox>
    </div>
  )
}
