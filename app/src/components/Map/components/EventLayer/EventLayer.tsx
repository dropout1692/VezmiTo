import { useMapEvents } from 'react-leaflet'
import {
  setLocation,
  setZoom,
  usePageDispatch,
} from '../../../../store/features/page/pageSlice'

export const EventLayer = () => {
  const pageDispatch = usePageDispatch()

  const mapEvents = useMapEvents({
    zoomend: () => {
      const zoom = mapEvents.getZoom()
      pageDispatch(setZoom(zoom))
    },
    dragend: () => {
      const { lat, lng } = mapEvents.getCenter()
      const zoom = mapEvents.getZoom()
      pageDispatch(
        setLocation({
          lat,
          lng,
          zoom,
        }),
      )
    },
  })

  return null
}
