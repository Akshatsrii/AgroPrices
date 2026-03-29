import { useState, useEffect } from 'react'

function useGeoLocation() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }, [])

  return location
}

export default useGeoLocation