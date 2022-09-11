import Leaflet from 'leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

export default function HomePage() {
  useEffect(() => {
    var map = Leaflet.map('map').setView([51.505, -0.09], 13)
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    return () => {
      map.remove()
    }
  }, [])
  return (
    <div>
      <div id="map" className="h-screen w-screen z-0"></div>
    </div>
  )
}
