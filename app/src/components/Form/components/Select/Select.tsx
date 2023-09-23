import { CSSProperties, ReactNode, useState } from 'react'
import { clsx } from 'clsx'
import * as Form from '@radix-ui/react-form'
import * as RadixSelect from '@radix-ui/react-select'
import { Icon } from '../../../Icon'

export type SelectProps = {
  label?: ReactNode | string
  name: string
  onChange?: (arg0: string) => void
  className?: string
  inputClassName?: string
  required?: boolean
  style?: CSSProperties
  isDisabled?: boolean
  hidden?: boolean
  options: {
    value: string | number
    label: string | JSX.Element
    disabled?: boolean
  }[]
  selectClassName?: string
  direction?: 'vertical' | 'horizontal'
  emptyOptionLabel?: string
  placeholder?: string
  value?: string
}

export const Select = ({
  name,
  hidden,
  style,
  className,
  selectClassName,
  label,
  direction = 'horizontal',
  isDisabled,
  options = [],
  onChange,
  placeholder,
  value,
}: SelectProps) => {
  const containerClasses = clsx(
    'border container text-sm',
    {
      hidden: hidden,
    },
    className,
  )

  return (
    <Form.Field className={containerClasses} style={style} name={name}>
      <Form.Label
        className={clsx(
          'bg-form-field-bg rounded flex flex-wrap items-stretch relative',
          {
            'flex-col': direction === 'vertical',
          },
        )}
      >
        {label && (
          <div
            className={clsx('flex-1 min-w-0 py-2 px-3 text-label-color', {
              'mb-1': direction === 'vertical',
            })}
          >
            {label}
          </div>
        )}
        <div className="flex-1 min-w-0 flex items-center py-2 px-3">
          <RadixSelect.Root
            aria-label={placeholder}
            value={value}
            onValueChange={onChange}
            disabled={isDisabled}
          >
            <RadixSelect.Trigger
              className={clsx(
                'inline-flex items-center justify-between w-full focus:outline-none data-[placeholder]:text-label-color',
                selectClassName,
              )}
            >
              <RadixSelect.Value placeholder={placeholder || 'Select'} />
              <RadixSelect.Icon className="pl-1">
                <Icon provider="phosphor" icon="caret-down" size={'1rem'} />
              </RadixSelect.Icon>
            </RadixSelect.Trigger>
            <RadixSelect.Portal>
              <RadixSelect.Content className="overflow-hidden bg-white text-sm rounded border border-border-color p-1 min-w-[130px] z-[2000]">
                <RadixSelect.Viewport>
                  {options.map((option) => (
                    <RadixSelect.Item
                      key={option.value}
                      value={option.value.toString()}
                      disabled={option.disabled}
                      className="flex justify-between items-center p-2 hover:outline-none focus-visible:outline-none hover:bg-form-field-bg rounded"
                    >
                      <RadixSelect.ItemText>
                        {option.label}
                      </RadixSelect.ItemText>
                      <RadixSelect.ItemIndicator className="pl-1">
                        <Icon provider="phosphor" icon="check" size={'1rem'} />
                      </RadixSelect.ItemIndicator>
                    </RadixSelect.Item>
                  ))}
                </RadixSelect.Viewport>
              </RadixSelect.Content>
            </RadixSelect.Portal>
          </RadixSelect.Root>
        </div>
      </Form.Label>
    </Form.Field>
  )
}
