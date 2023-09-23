import './homepage.scss'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet.markercluster'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import { useGetSubmissions } from '../../hooks/submissions/useGetSubmissions'
import { Spinner } from '../../components/Spinner/Spinner'

const ComponentResize = () => {
  const map = useMap()

  setTimeout(() => {
    map.invalidateSize()
  }, 0)

  return null
}

export const Homepage = () => {
  const { data, silentLoading } = useGetSubmissions()

  return (
    <div className="h-full w-full">
      <Spinner show={silentLoading} isFullscreen />
      <MapContainer
        className="markercluster-map"
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
      >
        <ComponentResize />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data && (
          <MarkerClusterGroup>
            {data.map((submission: any) => {
              const { id, location } = submission
              return (
                <Marker
                  key={id}
                  position={{
                    lat: location?.latitude,
                    lng: location?.longitude,
                  }}
                />
              )
            })}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  )
}
