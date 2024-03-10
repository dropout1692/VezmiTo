import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import { TAGS } from './../../../config/tags'
import { BasePin } from '../components/icons/BasePin'
import { VeggiesIcon } from '../components/icons/VeggiesIcon'
import { HerbsIcon } from '../components/icons/HerbsIcon'
import { FallbackIcon } from '../components/icons/FallbackIcon'
import { FruitsIcon } from '../components/icons/FruitsIcon'
import { MushroomsIcon } from '../components/icons/MushroomsIcon'
import { NutsIcon } from '../components/icons/NutsIcon'
import { SubmissionType } from '../../../store/features/submissions/submissionsSliceType'
import { isActiveSeason } from '../../../helpers/isActiveSeason'
import clsx from 'clsx'

const PIN_SIZE = 55
const STROKE_COLOR = '#fff'
const TEMP_LOCATION_PIN_COLOR = '#cf250e'

const ICON_MAP_BY_TAG: Record<string, any> = {
  veggies: VeggiesIcon,
  herbs: HerbsIcon,
  fruits: FruitsIcon,
  mushrooms: MushroomsIcon,
  nuts: NutsIcon,
}

export const AVAILABLE_TAGS = TAGS.map(({ type }) => type)

export const CustomPin = ({ color, isTemp, submission }) => {
  const { tags } = submission
  const category = tags.filter((tag) => AVAILABLE_TAGS.includes(tag))?.[0]

  const tagConfig = TAGS.find((tag) => tag.type === category) || {}
  const isSeason = isTemp || isActiveSeason({ submission })
  const fill = color || tagConfig?.color || '#000'

  const PinIcon = ICON_MAP_BY_TAG[category] || FallbackIcon

  return (
    <div
      className={clsx('vt-pin relative', {
        'vt-pin--temp': isTemp,
      })}
    >
      <BasePin
        stroke={STROKE_COLOR}
        strokeWidth={8}
        fill={isSeason ? fill : '#A9A9A9'}
        style={{
          opacity: isSeason ? 1 : 0.75,
        }}
      />
      <PinIcon
        fill="none"
        strokeWidth={16}
        stroke={STROKE_COLOR}
        className="absolute top-[10px] left-[50%] transform translate-x-[-50%]"
        width={PIN_SIZE / 2.2}
        height={PIN_SIZE / 2.2}
      />
    </div>
  )
}

export const getRequiredSVGPinByCategory = ({
  submission,
}: {
  submission: SubmissionType
}) => {
  const pin = <CustomPin submission={submission} />

  const iconMarkup = renderToStaticMarkup(pin)
  const customMarketIcon = divIcon({
    html: iconMarkup,
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [42, 19],
  })
  return customMarketIcon
}
