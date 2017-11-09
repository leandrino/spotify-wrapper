import { API_URL, HEADERS } from './config';
import { toJSON } from './utils';

const getAlbum = id =>
  fetch(`${API_URL}/albums/${id}`, HEADERS)
    .then(toJSON);

const getAlbums = ids =>
  fetch(`${API_URL}/albums/?ids=${ids}`, HEADERS)
    .then(toJSON);

const getAlbumTracks = album =>
  fetch(`${API_URL}/albums/${album}/tracks`, HEADERS)
    .then(toJSON);

export { getAlbum, getAlbums, getAlbumTracks };
