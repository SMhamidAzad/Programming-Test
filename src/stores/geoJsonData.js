
// src/lib/countryDataStore.js
import { writable } from 'svelte/store';

// Create a writable store to hold the country data
export const geoJsonDataStore = writable([]);


async function fetchGeoJsonData() {
    try {
        const response = await fetch(`/countries.geojson`); // Reference the file in the static folder
        if (!response.ok) {
            throw new Error('Failed to fetch geoJSON data');
        }
        const data = await response.json();
        geoJsonDataStore.set(data);
       
    } catch (error) {
        console.error(error);
    }
}
fetchGeoJsonData();