import { useEffect, useRef, useState } from "react"
import { FaMapMarkerAlt } from "react-icons/fa"

const GoogleMap = ({ center, messes }) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    }

    const initMap = () => {
      if (!center || !mapRef.current) return

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: center.latitude, lng: center.longitude },
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      setMap(mapInstance)

      // Add user location marker
      new window.google.maps.Marker({
        position: { lat: center.latitude, lng: center.longitude },
        map: mapInstance,
        title: "Your Location",
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(24, 24),
        },
      })

      // Add mess markers
      const newMarkers = messes.map((mess) => {
        if (!mess.location?.coordinates) return null

        const marker = new window.google.maps.Marker({
          position: {
            lat: mess.location.coordinates[1],
            lng: mess.location.coordinates[0],
          },
          map: mapInstance,
          title: mess.messName,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF6B35"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          },
        })

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${mess.messName}</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${mess.address || 'Address not available'}</p>
              <p style="margin: 0; font-size: 12px; color: #666;">${mess.openingHours || 'Hours not specified'}</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(mapInstance, marker)
        })

        return marker
      }).filter(Boolean)

      setMarkers(newMarkers)
    }

    loadGoogleMaps()

    // Cleanup
    return () => {
      markers.forEach((marker) => {
        if (marker) {
          marker.setMap(null)
        }
      })
    }
  }, [center, messes])

  // Fallback component if Google Maps fails to load
  if (!window.google) {
    return (
      <div className="h-full bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Map loading...</p>
          <p className="text-sm text-gray-500 mt-2">
            {messes.length} messes found nearby
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "400px" }}
    />
  )
}

export default GoogleMap