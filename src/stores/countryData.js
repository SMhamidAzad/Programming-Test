// src/lib/countryDataStore.js
import { writable } from 'svelte/store';

// Create a writable store to hold the country data
export const countryDataStore = writable([]);

// Function to fetch and update da
async function fetchCountryData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json()
 
    countryDataStore.set(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
fetchCountryData();