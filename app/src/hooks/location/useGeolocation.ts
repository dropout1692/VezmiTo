import { useCallback, useEffect, useState } from 'react'

type UseGeolocationArgsType = {
  getOnInit?: boolean
  shouldWatchPosition?: boolean
  options?: {
    /* 
        A positive long value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. 
        If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. 
        If set to Infinity the device must return a cached position regardless of its age. 
        Default: 0.
    */
    maximumAge?: number
    /* 
    A positive long value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position.
    The default value is Infinity, meaning that getCurrentPosition() won't return until the position is available.
    */
    timeout?: number
    /*
        A boolean value that indicates the application would like to receive the best possible results.
        If true and if the device is able to provide a more accurate position, it will do so. 
        Note that this can result in slower response times or increased power consumption (with a GPS chip on a mobile device for example). 
        On the other hand, if false, the device can take the liberty to save resources by responding more quickly and/or using less power. 
        Default: false.
    */
    enableHighAccuracy?: boolean
  }
}

type GeolocationData = {
  loading: boolean
  timestamp?: number
  coords?: GeolocationCoordinates
}
export function useGeolocation({
  getOnInit = true,
  shouldWatchPosition = false,
  options = {},
}: UseGeolocationArgsType = {}) {
  const [geolocationData, setGeolocationData] = useState<GeolocationData>({
    loading: true,
  })

  const onEventError = (error: any) => {
    setGeolocationData((prevState) => ({
      ...prevState,
      loading: false,
      error,
    }))
  }

  const handleSetGeolocationData = ({
    coords,
    timestamp,
  }: {
    timestamp?: number
    coords?: GeolocationCoordinates
  }) => {
    setGeolocationData({
      loading: false,
      timestamp,
      coords,
    })
  }

  const getCurrentPosition = useCallback(async () => {
    const position = (await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })) as GeolocationPosition

    handleSetGeolocationData({
      ...position,
      timestamp: Date.now(),
      coords: {
        accuracy: position?.coords?.accuracy,
        altitude: position?.coords?.altitude,
        altitudeAccuracy: position?.coords?.altitudeAccuracy,
        heading: position?.coords?.heading,
        latitude: position?.coords?.latitude,
        longitude: position?.coords?.longitude,
        speed: position?.coords?.speed,
      },
    })
  }, [])

  useEffect(() => {
    if (getOnInit) {
      getCurrentPosition()
    }

    let watchId: any

    if (shouldWatchPosition) {
      watchId = navigator.geolocation.watchPosition(
        handleSetGeolocationData,
        onEventError,
        options,
      )
    }

    return () => {
      if (shouldWatchPosition && watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [getCurrentPosition])

  return {
    geoData: geolocationData,
    getCurrentPosition,
  }
}
