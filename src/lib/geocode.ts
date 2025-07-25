// services/service/src/lib/geocode.ts

import { LRUCache } from 'lru-cache';

// Simple in-memory cache to avoid repeated API calls for the same pincode
const cache = new LRUCache<string, { lat: number; lon: number }>({
    max: 500, // cache up to 500 pincodes
    ttl: 1000 * 60 * 60 * 24, // cache for 24 hours
});

/**
 * Geocodes a pincode to latitude and longitude using OpenStreetMap Nominatim API.
 * @param pincode The postal code to geocode.
 * @param country The country code (e.g., 'IN' for India, 'US' for United States).
 * @returns An object with lat and lon, or null if not found.
 */
export async function geocodePincode(pincode: string, country: string = 'IN'): Promise<{ lat: number; lon: number } | null> {
    const cacheKey = `${pincode},${country}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey) || null;
    }

    try {
        const url = `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(
            pincode
        )}&country=${encodeURIComponent(country)}&format=json&limit=1`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'HandyConnect/1.0 (johndoe@example.com)'
            }
        });

        if (!response.ok) {
            console.error(`Nominatim API failed with status: ${response.status}`);
            return null;
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const location = {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
            };
            cache.set(cacheKey, location);
            return location;
        }

        return null;
    } catch (error) {
        console.error('Error geocoding pincode:', error);
        return null;
    }
}

/**
 * Calculates the Haversine distance between two points on the Earth.
 * @param lat1 Latitude of the first point.
 * @param lon1 Longitude of the first point.
 * @param lat2 Latitude of the second point.
 * @param lon2 Longitude of the second point.
 * @returns The distance in kilometers.
 */
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}