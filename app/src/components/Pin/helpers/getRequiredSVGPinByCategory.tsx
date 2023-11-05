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

const PIN_SIZE = 55
const STROKE_COLOR = '#fff'

const ICON_MAP_BY_TAG: Record<string, any> = {
  veggies: VeggiesIcon,
  herbs: HerbsIcon,
  fruits: FruitsIcon,
  mushrooms: MushroomsIcon,
  nuts: NutsIcon,
}

const CustomPin = ({ fill, Icon, disabled }) => {
  return (
    <div className="relative">
      <BasePin
        stroke={STROKE_COLOR}
        strokeWidth={8}
        fill={fill}
        style={{
          opacity: disabled ? 0.5 : 1,
        }}
      />
      <Icon
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
  const { tags } = submission
  const category = tags[0]

  const tagConfig = TAGS.find((tag) => tag.type === category) || {}
  const isSeason = isActiveSeason({ submission })
  const fill = tagConfig?.color || '#000'

  const PinIcon = ICON_MAP_BY_TAG[category] || FallbackIcon
  const pin = <CustomPin fill={fill} Icon={PinIcon} disabled={!isSeason} />

  const iconMarkup = renderToStaticMarkup(pin)
  const customMarketIcon = divIcon({
    html: iconMarkup,
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [42, 19],
  })
  return customMarketIcon
}
