import { useMap } from 'react-leaflet'

export const ComponentResize = () => {
  const map = useMap()

  setTimeout(() => {
    map.invalidateSize()
  }, 0)

  return null
}
