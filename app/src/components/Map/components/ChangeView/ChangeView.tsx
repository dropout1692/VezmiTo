import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import {
  selectLocation,
  selectZoom,
  usePageSelector,
} from '../../../../store/features/page/pageSlice'

export const ChangeView = () => {
  const map = useMap()
  const zoom = usePageSelector(selectZoom)
  const { lat, lng } = usePageSelector(selectLocation)

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], zoom)
    }
  }, [lat, lng])

  return null
}
