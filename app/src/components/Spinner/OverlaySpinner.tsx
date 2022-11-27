import { IonItem, IonSpinner } from "@ionic/react";
import "./OverlaySpinner.css";

export function OverlaySpinner({
  show,
  zIndex = 1000,
}: {
  show: boolean;
  zIndex?: number;
}) {
  if (!show) {
    return null;
  }
  return (
    <div style={{ zIndex }} className="overlay-spinner">
      <IonSpinner name="circular" color="primary"></IonSpinner>
    </div>
  );
}
