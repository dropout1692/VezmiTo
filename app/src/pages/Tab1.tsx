import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import './Tab1.css'
import 'leaflet.markercluster'
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'
import { useGetSubmissions } from '../hooks/submissions/useGetSubmissions'
import React from 'react'
import { OverlaySpinner } from '../components/Spinner/OverlaySpinner'

const ComponentResize = () => {
  const map = useMap()

  setTimeout(() => {
    map.invalidateSize()
  }, 0)

  return null
}

const Tab1: React.FC = () => {
  const { data, silentLoading } = useGetSubmissions()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <OverlaySpinner show={silentLoading} />
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
      </IonContent>
    </IonPage>
  )
}

export default Tab1
