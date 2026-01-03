import axios from 'axios';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;

export async function fetchGoogleComedyVenues(city, state) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
  const params = {
    query: `comedy club in ${city}, ${state}`,
    key: GOOGLE_API_KEY,
    type: 'night_club',
  };
  const { data } = await axios.get(url, { params });
  return data.results || [];
}

export async function fetchYelpOpenMics(city, state) {
  const url = `https://api.yelp.com/v3/businesses/search`;
  const params = {
    term: 'open mic',
    location: `${city}, ${state}`,
    categories: 'comedyclubs',
    sort_by: 'rating',
    limit: 10,
  };
  const headers = {
    Authorization: `Bearer ${YELP_API_KEY}`,
  };
  // Note: For CORS, you may need a backend proxy for Yelp API
  const { data } = await axios.get(url, { params, headers });
  return data.businesses || [];
}