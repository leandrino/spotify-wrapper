const getAlbum = (id) => {
  fetch(`https://api.spotify.com/v1/albums/${id}`)
    .then(data => data.json());
};

const getAlbums = (id) => {
  fetch(`https://api.spotify.com/v1/albums/?ids=${id}`)
    .then(data => data.json());
};

const getAlbumTracks = () => {};

export { getAlbum, getAlbums, getAlbumTracks };
