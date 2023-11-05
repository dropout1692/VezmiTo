import './map.scss'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet.markercluster'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { GeoSearch } from './components/GeoSearch/GeoSearch'
import { ComponentResize } from './components/ComponentResize/ComponentResize'
import { ChangeView } from './components/ChangeView/ChangeView'
import { LocateControl } from './components/LocateControl/LocateControl'
import { Pin } from '../Pin/Pin'
import {
  selectLocation,
  selectZoom,
  usePageSelector,
} from '../../store/features/page/pageSlice'
import { EventLayer } from './components/EventLayer/EventLayer'

export const Map = ({ data }) => {
  const zoom = usePageSelector(selectZoom)
  const { lat, lng } = usePageSelector(selectLocation)

  return (
    <MapContainer
      className="markercluster-map"
      center={[lat, lng]}
      zoom={zoom}
      maxZoom={18}
    >
      <ComponentResize />
      <EventLayer />
      <ChangeView />
      <GeoSearch provider={new OpenStreetMapProvider()} />
      <LocateControl position="topleft" />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {data && (
        <MarkerClusterGroup>
          {data.map((submission) => {
            const {
              id,
              location: { latitude, longitude },
              title,
              tags,
            } = submission
            return (
              <Pin
                key={id}
                position={[latitude, longitude]}
                title={title}
                tags={tags}
              />
            )
          })}
        </MarkerClusterGroup>
      )}
    </MapContainer>
  )
}
function useMap() {
  throw new Error('Function not implemented.')
}
