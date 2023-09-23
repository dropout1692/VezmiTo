import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

const LOCATION_FOUND_ZOOM = 15

export const ChangeView = ({ latitude, longitude }) => {
  const map = useMap()

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], LOCATION_FOUND_ZOOM)
    }
  }, [latitude, longitude])

  return null
}
