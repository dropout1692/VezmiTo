import { useEffect, useRef, useState } from 'react'

export function useGeolocation(options = {}) {
  const [state, setState] = useState({
    loading: true,
  })

  const optionsRef = useRef(options)

  const onEventError = (error) => {
    setState((s) => ({
      ...s,
      loading: false,
      error,
    }))
  }

  const onEvent = ({ coords, timestamp }) => {
    setState({
      loading: false,
      timestamp,
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      accuracy: coords.accuracy,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      speed: coords.speed,
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current,
    )

    const watchId = navigator.geolocation.watchPosition(
      onEvent,
      onEventError,
      optionsRef.current,
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return state
}
