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

const PIN_SIZE = 55
const STROKE_COLOR = '#fff'

const CustomPin = ({ fill, Icon }) => {
  return (
    <div className="relative">
      <BasePin stroke={STROKE_COLOR} strokeWidth={8} fill={fill} />
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

export const getRequiredSVGPinByCategory = (category) => {
  let pin

  const tagConfig = TAGS.find((tag) => tag.type === category) || {}
  const fill = tagConfig?.color || '#000'

  switch (category) {
    case 'veggies':
      pin = <CustomPin fill={fill} Icon={VeggiesIcon} />
      break
    case 'herbs':
      pin = <CustomPin fill={fill} Icon={HerbsIcon} />
      break
    case 'fruits':
      pin = <CustomPin fill={fill} Icon={FruitsIcon} />
      break
    case 'mushrooms':
      pin = <CustomPin fill={fill} Icon={MushroomsIcon} />
      break
    case 'nuts':
      pin = <CustomPin fill={fill} Icon={NutsIcon} />
      break
    default:
      pin = <CustomPin fill={fill} Icon={FallbackIcon} />
      break
  }
  const iconMarkup = renderToStaticMarkup(pin)
  const customMarketIcon = divIcon({
    html: iconMarkup,
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [42, 19],
  })
  return customMarketIcon
}
