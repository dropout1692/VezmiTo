import './map.scss'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet.markercluster'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { GeoSearch } from '../../components/GeoSearch/GeoSearch'
import { ComponentResize } from './components/ComponentResize/ComponentResize'
import { ChangeView } from './components/ChangeView/ChangeView'

const INITIAL_ZOOM = 5
const INITIAL_LOCATION = {
  lat: 51.0,
  lon: 19.0,
}

export const Map = ({ latitude, longitude, data }) => {
  return (
    <MapContainer
      className="markercluster-map"
      center={[INITIAL_LOCATION.lat, INITIAL_LOCATION.lon]}
      zoom={INITIAL_ZOOM}
      maxZoom={18}
    >
      <ComponentResize />
      <ChangeView latitude={latitude} longitude={longitude} />
      <GeoSearch provider={new OpenStreetMapProvider()} />
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
  )
}
