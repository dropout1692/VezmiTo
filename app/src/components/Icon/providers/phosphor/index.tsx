import React from 'react'
import { Plus, Minus, X, Tree, Check, CaretDown } from '@phosphor-icons/react'

export const PHOSPHOR_ICONS = {
  plus: Plus,
  minus: Minus,
  x: X,
  tree: Tree,
  check: Check,
  'caret-down': CaretDown,
}

type PhosphorIconProps = {
  className?: string
  style?: React.CSSProperties
  icon: keyof typeof PHOSPHOR_ICONS
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  alt?: string
  color?: string
  size?: string | number
  mirrored?: boolean
}

export function PhosphorIcon({
  icon,
  className,
  style,
  weight,
  alt,
  color,
  size,
  mirrored,
}: PhosphorIconProps) {
  if (!Object.keys(PHOSPHOR_ICONS).includes(icon)) {
    console.error('[Icons] - icon not found')
    return null
  }

  const Icon = PHOSPHOR_ICONS[icon]

  return (
    <Icon
      className={className}
      style={style}
      weight={weight}
      alt={alt}
      color={color}
      size={size}
      mirrored={mirrored}
    />
  )
}
