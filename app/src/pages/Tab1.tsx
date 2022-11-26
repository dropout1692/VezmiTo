import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "./Tab1.css";
import "leaflet.markercluster";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

const Tab1: React.FC = () => {
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
          <MarkerClusterGroup>
            <Marker position={[49.8397, 24.0297]} />
            <Marker position={[52.2297, 21.0122]} />
            <Marker position={[51.5074, -0.0901]} />
          </MarkerClusterGroup>
        </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
