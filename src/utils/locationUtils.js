import { getDistance } from 'geolib';
import { DEFAULT_LOCATION } from './constants';

// Get user's current location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        // If user denies permission or any other error, use default location
        console.warn('Error getting location:', error.message);
        resolve(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000, // Cache for 1 minute
      }
    );
  });
};

// Calculate distance between two coordinates
export const calculateDistance = (coord1, coord2) => {
  return getDistance(
    { latitude: coord1.latitude, longitude: coord1.longitude },
    { latitude: coord2.latitude, longitude: coord2.longitude }
  );
};

// Format distance for display
export const formatDistance = (distanceInMeters) => {
  if (distanceInMeters < 1000) {
    return `${Math.round(distanceInMeters)} m`;
  } else {
    return `${(distanceInMeters / 1000).toFixed(1)} km`;
  }
};

// Get address from coordinates using reverse geocoding
export const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted;
    }
    return 'Address not found';
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Address not available';
  }
};

// Get coordinates from address using geocoding
export const getCoordsFromAddress = async (address) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
        formatted: result.formatted,
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

// Check if location permission is granted
export const checkLocationPermission = async () => {
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    return permission.state; // 'granted', 'denied', or 'prompt'
  } catch (error) {
    console.error('Error checking location permission:', error);
    return 'unknown';
  }
};

// Store user location in localStorage
export const storeUserLocation = (location) => {
  try {
    localStorage.setItem('userLocation', JSON.stringify({
      ...location,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.error('Error storing user location:', error);
  }
};

// Get stored user location from localStorage
export const getStoredUserLocation = () => {
  try {
    const stored = localStorage.getItem('userLocation');
    if (stored) {
      const location = JSON.parse(stored);
      // Check if location is less than 5 minutes old
      if (Date.now() - location.timestamp < 5 * 60 * 1000) {
        return {
          latitude: location.latitude,
          longitude: location.longitude,
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting stored location:', error);
    return null;
  }
};

// Get user location with fallback to stored location
export const getUserLocation = async () => {
  // First try to get stored location
  const storedLocation = getStoredUserLocation();
  if (storedLocation) {
    return storedLocation;
  }

  // If no stored location or it's old, get current location
  try {
    const currentLocation = await getCurrentLocation();
    storeUserLocation(currentLocation);
    return currentLocation;
  } catch (error) {
    console.error('Error getting user location:', error);
    return DEFAULT_LOCATION;
  }
};

// Calculate bounds for a given center and radius
export const calculateBounds = (center, radiusInMeters) => {
  const latDelta = radiusInMeters / 111320; // 1 degree lat = ~111.32 km
  const lngDelta = radiusInMeters / (111320 * Math.cos(center.latitude * Math.PI / 180));

  return {
    north: center.latitude + latDelta,
    south: center.latitude - latDelta,
    east: center.longitude + lngDelta,
    west: center.longitude - lngDelta,
  };
};