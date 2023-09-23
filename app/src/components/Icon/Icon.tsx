import { clsx } from 'clsx'
import { PhosphorIcon, PHOSPHOR_ICONS } from './providers/phosphor'

export const ICON_PROVIDERS = {
  phosphor: {
    component: PhosphorIcon,
    icons: PHOSPHOR_ICONS,
  },
}

type Providers = keyof typeof ICON_PROVIDERS

export type IconProps<P extends Providers> = {
  className?: string
  style?: React.CSSProperties
  size?: number | string
  weight?: string
  provider: P
  icon: keyof (typeof ICON_PROVIDERS)[P]['icons']
}

export function Icon<P extends Providers>({
  className,
  size,
  style,
  provider,
  icon,
  weight,
}: IconProps<P>) {
  if (!icon) {
    throw new Error('[Icons] - "icon" property is not defined')
  }

  if (!provider) {
    throw new Error('[Icons] - "provider" property is not defined')
  }

  const ProviderIconComponent = ICON_PROVIDERS[provider]
    .component as React.FC<any>

  return (
    <ProviderIconComponent
      icon={icon}
      className={clsx(className)}
      weight={weight}
      style={{
        width: size,
        height: size,
        ...(style && style),
      }}
    />
  )
}
