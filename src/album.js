const getAlbum = id =>
  fetch(`https://api.spotify.com/v1/albums/${id}`)
    .then(data => data.json());

const getAlbums = ids =>
  fetch(`https://api.spotify.com/v1/albums/?ids=${ids}`)
    .then(data => data.json());

const getAlbumTracks = album =>
  fetch(`"https://api.spotify.com/v1/albums/${album}/tracks`)
    .then(data => data.json());

export { getAlbum, getAlbums, getAlbumTracks };
