const apiPrefix = 'https://accounts.spotify.com/api';
const apiPrefix1 = 'https://api.spotify.com/v1';
const base64credentials =
  'OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=';
const q = 'latest';
export default async () => {
  console.log('token begin');
  const res = await fetch(`${apiPrefix}/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const json = await res.json();
  const newToken = json.access_token;
  // const uri =
  //   'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=US';

  const uri = `https://api.spotify.com/v1/tracks/${'1TIiWomS4i0Ikaf9EKdcLn'}`;

  console.log('search begin, uri =', uri, 'token =', newToken);
  const res1 = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${newToken}`,
    },
  });
  const json1 = await res1.json();
  console.log('search got json', json1);

  if (!res.ok) {
    return [];
  }

  const {
    tracks: {items},
  } = json1;
  // const items = json.tracks.items;
  return items.map((item) => ({
    id: item.id,
    title: item.name,
    imageUri: item.album.images ? item.album.images[0].url : undefined,
  }));
  // console.log('search end');
  // return newToken;
};
