const apiPrefix = 'https://accounts.spotify.com/api';
const base64credentials =
  'OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=';

export const getToken = async () => {
  const res = await fetch(`${apiPrefix}/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  return res;
};

export const getSuggestions = async () => {
  const res = await getToken();
  const json = await res.json();
  const newToken = json.access_token;
  const data = await fetch('https://ipapi.co/json/');
  const jsonCountry = await data.json();
  const uri = `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=${jsonCountry.country}`;
  const res1 = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${newToken}`,
    },
  });
  return await res1.json();
};

export const getTracks = async (selectedIds) => {
  const res = await getToken();
  const json = await res.json();
  const newToken = json.access_token;
  const uri = `https://api.spotify.com/v1/tracks?ids=${encodeURIComponent(
    selectedIds.join(),
  )}`;
 const res1 = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${newToken}`,
    },
  });
  return await res1.json();
};
