import { API_URL } from './config';

const getAlbum = id =>
  fetch(`${API_URL}/albums/${id}`)
    .then(data => data.json());

const getAlbums = ids =>
  fetch(`${API_URL}/albums/?ids=${ids}`)
    .then(data => data.json());

const getAlbumTracks = album =>
  fetch(`${API_URL}/albums/${album}/tracks`)
    .then(data => data.json());

export { getAlbum, getAlbums, getAlbumTracks };
