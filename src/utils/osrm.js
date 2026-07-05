/**
 * Fetches routing information from the public OSRM API.
 * 
 * @param {Array} start - [lat, lng]
 * @param {Array} end - [lat, lng]
 * @param {string} profile - 'driving' or 'walking'
 * @returns {Promise<{ distance: number, duration: number }>}
 *  - distance is in kilometers
 *  - duration is in minutes
 */
export async function getRouteDistanceAndTime(start, end, profile = 'driving') {
  try {
    // OSRM expects coordinates in [lng, lat] format
    const coordinates = `${start[1]},${start[0]};${end[1]},${end[0]}`;
    const url = `https://router.project-osrm.org/route/v1/${profile}/${coordinates}?overview=full&geometries=geojson`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }
    
    const route = data.routes[0];
    
    // Distance comes back in meters, convert to kilometers
    const distanceKm = +(route.distance / 1000).toFixed(1);
    
    // Duration comes back in seconds, convert to minutes
    const durationMin = Math.round(route.duration / 60);
    
    return {
      distance: distanceKm,
      duration: durationMin,
      geometry: route.geometry.coordinates // Array of [lng, lat]
    };
  } catch (error) {
    console.error(`Error fetching ${profile} route from OSRM:`, error);
    return null;
  }
}
