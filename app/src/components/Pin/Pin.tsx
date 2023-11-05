import React, { useMemo, useRef, useState } from 'react'
import { Marker, MarkerProps, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { createPortal } from 'react-dom'
import { useParams } from '../../hooks/url/useParams'
import {
  selectZoom,
  usePageSelector,
} from '../../store/features/page/pageSlice'

const MIN_ZOOM_TO_SHOW_PIN = 14

interface Props extends MarkerProps {
  /**
   * Options to pass to the react-lefalet L.divIcon that is used as the marker's custom icon
   */
  iconOptions?: L.DivIconOptions
  title?: string
}

const ReactMarkerForward = React.forwardRef<L.Marker, MarkerProps>(
  ({ title, children, ...props }: MarkerProps, ref) => {
    const zoom = usePageSelector(selectZoom)

    const showTitle = zoom > MIN_ZOOM_TO_SHOW_PIN && title
    return (
      <Marker ref={ref} {...props}>
        {showTitle && (
          <Tooltip direction="bottom" offset={[-15, 30]} opacity={1} permanent>
            <span>{title}</span>
          </Tooltip>
        )}
      </Marker>
    )
  },
)

export const Pin: React.FC<MarkerProps> = (
  { children, ...rest },
  refInParent,
) => {
  const ref = useRef<L.Marker>(null)
  return (
    <>
      {useMemo(
        () => (
          <ReactMarkerForward {...rest} ref={ref} />
        ),
        [],
      )}
      {ref && ref.current && ref.current.getElement()
        ? createPortal(children, ref.current.getElement()!)
        : ''}
    </>
  )
}
